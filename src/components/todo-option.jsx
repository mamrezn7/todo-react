/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import React, { Fragment, useEffect, useRef } from "react";
import data from "../data.json";
import { useFormikContext } from "formik";

const ToDoOption = ({ todo, index }) => {
  //   const handleClick = (e) => {
  //     e.preventDefault();
  //     handleToggle(e.currentTarget.id);
  //   };
  const { setFieldValue, values } = useFormikContext();

  const style = css({
    ".option": {
      borderBottom: "1px solid #888",
    },
    ".option:hover": {
      cursor: "pointer",
      backgroundColor: "#242e40",
      color: "#FFF",
      ".delete": { display: "block" },
    },
    ".delete": { color: "red", direction: "rtl", display: "none" },
  });
  console.log(todo);

  const remove = (index) => {
    let newarray = [...(values.tasks ?? [])];
    newarray.splice(index, 1);
    setFieldValue("tasks", newarray);
    localStorage.setItem("todo", JSON.stringify(values));
  };

  const handleDoubleClick = (e) => {
    switch (e.detail) {
      case 1:
        console.log("click");
        break;
      case 2:
        console.log("double click");
        setFieldValue(`tasks[${index}].is_editable`, true);
        // setFieldValue(`tasks[${index}].task`, values.tasks[index]?.task);
        break;
    }
  };

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setFieldValue("is_editable", false);
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
  const updatetask = (e, index) => {
    let newarray = [...(values.tasks ?? [])];
    if (newarray.length > 0 && newarray[index]) {
      newarray[index].task = e.target.value;
      setFieldValue("tasks", newarray);
      localStorage.setItem("todo", JSON.stringify(values));
    }
    if (e.key === "Enter" || e.key === "NumpadEnter") {
      setFieldValue(`tasks[${index}].is_editable`, false);
      localStorage.setItem("todo", JSON.stringify(values));

      // debugger;
      // newarray.push({ task: e.target.value, is_editable: false });

      // setFieldValue("task", "");
    }
  };

  return (
    <div
      id={index}
      key={index}
      name="todo"
      // className={todo.complete ? "todo strike" : "todo"}
      css={style}
      ref={wrapperRef}
    >
      <div
        className="option d-flex flex-row justify-content-between p-2"
        onClick={(e) => handleDoubleClick(e)}
      >
        {values.tasks[index]?.is_editable ? (
          <input
            className="flex-grow-1"
            name={`tasks[${index}].task`}
            defaultValue={values.tasks[index].task}
            onKeyUp={(e) => {
              updatetask(e, index);
            }}
          ></input>
        ) : (
          <div>
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <label for="vehicle1" className="mx-2">
              {todo?.task}
            </label>
            {/* <span className="flex-grow-1">{todo?.task}</span> */}
          </div>
        )}
        <div className="delete" onClick={() => remove(index)}>
          &#9932;
        </div>
      </div>
    </div>
  );
};

export default ToDoOption;
