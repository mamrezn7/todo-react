/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React, { useEffect, useRef } from "react";
import ToDoOption from "./todo-option";
import { useFormikContext } from "formik";
import data from "../data.json";

const style = css({
  width: "320px",
  boxShadow: "0px 0px 8px #888",
  border: "1px solid #888",
  borderTop: "8px solid #854",
  borderRadius: "0.3rem",

  ".options": {},

  ".form__input": {
    fontFamily: "sans-serif",
    color: "#333",
    fontSize: "1.2rem",
    margin: "0 auto",
    padding: "0.5rem 2rem",
    backgroundColor: "rgb(255, 255, 255)",
    width: "100%",
    display: "block",
    transition: "all 0.3s",
  },
});

const ToDoList = ({ toDoList }) => {
  const { setFieldValue, values, setValues } = useFormikContext();

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        console.log(values.tasks);
        if (ref.current && !ref.current.contains(event.target)) {
          toDoList.forEach((item, index) => {
            setFieldValue(`tasks[${index}].is_editable`, false);
          });
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const addtask = (e) => {
    debugger;
    localStorage.setItem("todo", JSON.stringify(values));
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      let newarray = [...(values.tasks ?? [])];
      newarray.push({ task: e.target.value, is_editable: false });
      setFieldValue("tasks", newarray);
      setFieldValue("task", "");
    }
  };
  useEffect(() => {
    let new_merchant_form = JSON.parse(localStorage.getItem("todo"));
    setValues({ ...values, ...new_merchant_form });
  }, []);

  return (
    <div css={style} ref={wrapperRef} class="form__group">
      <input
        type="text"
        className="form__input"
        name="task"
        id="task"
        placeholder="What should be done?"
        required=""
        onKeyUp={(e) => {
          addtask(e);
        }}
      />
      <div className="options">
        {toDoList.map((todo, index) => {
          return <ToDoOption todo={todo} index={index} />;
        })}
      </div>
    </div>
    // <select className="list">
    //   <option selected>Open this select menu</option>
    //   <option value="1">One</option>
    //   <option value="2">Two</option>
    //   <option value="3">Three</option>
    //   {toDoList.map((todo) => {
    //     return (
    //       <ToDoOption
    //         todo={todo}
    //         handleToggle={handleToggle}
    //         handleFilter={handleFilter}
    //       />
    //     );
    //   })}
    //   <button style={{ margin: "20px" }} onClick={handleFilter}>
    //     Clear Completed
    //   </button>
    // </select>
  );
};

export default ToDoList;
