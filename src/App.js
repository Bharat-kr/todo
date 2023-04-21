import { useState } from "react";
import "./App.css";
import { useToDo } from "./contexts/TodoContext";
import { VscAdd, VscClose } from "react-icons/vsc";
import { AiOutlineDelete } from "react-icons/ai";

function App() {
  const {
    todolist,
    createTodo,
    markCompleted,
    deleteTodo,
    updateTodo,
    markMultipleCompleted,
    deleteMultiple,
  } = useToDo();
  const [newval, setNewval] = useState("");
  console.log(todolist);
  const [curr, setCurr] = useState("pending");
  return (
    <div className="text-3xl h-screen w-screen flex items-center justify-center flex-col">
      <div className="w-4/5 h-4/5 md:w-3/5 bg-cyan-100 rounded-xl p-3 flex flex-col">
        <h2 className="text-center font-openSans font-semibold tracking-wide text-cyan-600">
          TODO
        </h2>
        <div className="flex items-center justify-center gap-4 w-full mt-2">
          <button
            className="btn"
            onClick={() => {
              setCurr("pending");
            }}
          >
            Pending
          </button>
          <button
            className="btn"
            onClick={() => {
              setCurr("completed");
            }}
          >
            Completed
          </button>
        </div>
        <div className="grow my-2 rounded-lg">
          {curr === "pending" &&
            todolist
              .filter((item) => {
                return item.completed === false;
              })
              .map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex items-center border-cyan-500 border rounded px-1"
                  >
                    <p className="grow font-openSans text-base p-1">
                      {item.title}
                    </p>
                    <button className="btn-2 hover:bg-red-400">
                      <VscClose
                        className="w-4 h-4"
                        onClick={() => {
                          markCompleted(item.id);
                        }}
                      />
                    </button>
                  </div>
                );
              })}
          {curr === "completed" &&
            todolist
              .filter((item) => {
                return item.completed === true;
              })
              .map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex items-center border-cyan-500 border rounded px-1"
                  >
                    <p className="grow font-openSans text-base p-1">
                      {item.title}
                    </p>
                    <button className="btn-2 hover:bg-red-400">
                      <AiOutlineDelete
                        className="w-4 h-4"
                        onClick={() => {
                          deleteTodo(item.id);
                        }}
                      />
                    </button>
                  </div>
                );
              })}
        </div>
        <div className="w-full flex items-center gap-2">
          <input
            type="text"
            className="grow rounded-md outline-none font-poppins text-base px-2 py-1"
            onChange={(e) => {
              setNewval(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                createTodo(newval);
                setNewval("");
              }
            }}
          />
          <button className="btn-2">
            <VscAdd
              className="w-4 h-4"
              onClick={() => {
                createTodo(newval);
                setNewval("");
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
