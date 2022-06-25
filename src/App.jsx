/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React, { useState } from "react";
//mock data
import data from "./data.json";
//components
import ToDoList from "./components/todo-list";
import { Formik } from "formik";

const style = css({
  body: {
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
  },
});

function App() {
  return (
    <div className="container" css={style}>
      <header>
        <h4>To Do List</h4>
      </header>
      <Formik
        initialValues={{
          options: false,
          tasks: [],
          task: "",
        }}
      >
        {({ values }) => <ToDoList toDoList={values.tasks} />}
      </Formik>
      {/* <ToDoForm addTask={addTask} /> */}
    </div>
  );
}

export default App;
