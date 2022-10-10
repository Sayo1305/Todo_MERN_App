import React from "react";
import { useEffect } from "react";
import { useState } from "react";
const API = "http://localhost:3001";
const Todo = () => {
  const handle_active = () => {
    SetActive(!Active);
  };
  const [Active, SetActive] = useState(false);
  const [Todo, SetTodo] = useState([]);
  const [NewTodo , SetNewTodo] = useState("Task");
  const [Popup , setPopup] = useState(false);
  useEffect(() => {
    GetTodos();
  }, [Todo]);

  const GetTodos = () => {
    fetch(API + "/todos")
      .then((res) => res.json())
      .then((data) => SetTodo(data))
      .catch((err) => console.error(err));
  };
  const handle_change = (e)=>{
    SetNewTodo(e.target.value);
  }
  const CompleteTodo = async (id) => {
    const data = fetch(API + "/todos/complete/" + id)
      .then((res) => res.json())
      .catch((err) => console.error(err));
    SetTodo(
      Todo.map((todo) => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }
        return todo;
      })
    );
    console.log(data);
  };
  const AddTodo = async (e)=>{
    const data = await fetch(API + '/todos/new' , {
      method: "POST",
      headers:{
        "content-Type": "application/json"
      },
      body: JSON.stringify({
        text: e
      })
    }).then(res => res.json());
    console.log(data);
  }
  const deleteTodos = async (id) => {
    const data = fetch(API + "/todos/delete/" + id, { method: "DELETE" })
      .then((res) => res.json())
      .catch((err) => console.error(err));
    let templist = Todo;
    templist = templist.filter((todos) => todos._id !== data._id);
    SetTodo(templist);
  };
  return (
    <>
      <div className="TodoContainer">
        {Todo.map((val) => (
          <div
            className={`Todobox ` + (val.complete ? "complete" : "")}
            key={val._id}
          >
            <div onClick={handle_active}>
              <input
                type={"checkbox"}
                onClick={() => {
                  CompleteTodo(val._id);
                }}
              ></input>
            </div>
            <div className="TodoText">{val.text}</div>
            <div
              onClick={() => {
                deleteTodos(val._id);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fillRule="currentColor"
                className="bi bi-trash"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path
                  fillRule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
      <div className="AddNewCont">
        <div className="TodosAdd" onClick={()=>{setPopup(!Popup)}}>+</div>
      </div>
      {
        Popup === true ? (
          <div className="POPUP">
            <input className="POPUPTEXT" value={NewTodo} onChange={handle_change} placeholder="Enter the task"></input>
            <input className="Submit" type={"submit"} onClick={()=>{AddTodo(NewTodo) ;setPopup(!Popup)}}></input>
          </div>
        ):
        (
          null
        )
      }
    </>
  );
};

export default Todo;
