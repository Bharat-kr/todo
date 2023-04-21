import { useState } from "react";
import "./App.css";
import { useToDo } from "./contexts/TodoContext";
import { VscAdd, VscClose } from "react-icons/vsc";
import { AiOutlineDelete } from "react-icons/ai";
import { TbLayoutDashboard } from "react-icons/tb";

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
  const [currid, setCurrid] = useState("");
  const [selectedForCompleted, setSetlectedForCompleted] = useState([]);
  const [selectedForDeleting, setSelectedFordeleting] = useState([]);
  const [curr, setCurr] = useState("pending");

  const handleChange = () => {
    if (currid) {
      updateTodo(newval, currid);
    } else {
      createTodo(newval);
    }
    setNewval("");
    setCurrid("");
  };
  return (
    <div className="text-3xl h-screen w-screen flex items-center justify-center flex-col">
      <div className="w-4/5 h-4/5 md:w-3/5 bg-cyan-100 rounded-xl p-3 flex flex-col">
        <h2 className="text-center font-openSans font-semibold tracking-wide text-cyan-600">
          TODO
        </h2>
        <div className="flex items-center justify-center gap-4 w-full mt-2">
          <button
            className={curr === "pending" ? "btn" : "hollow-btn"}
            onClick={() => {
              setCurr("pending");
              setSelectedFordeleting([]);
            }}
          >
            Pending
          </button>
          <button
            className={curr === "completed" ? "btn" : "hollow-btn"}
            onClick={() => {
              setCurr("completed");
              setSetlectedForCompleted([]);
            }}
          >
            Completed
          </button>
        </div>
        <div className="grow my-2 rounded-lg flex flex-col gap-2">
          {curr === "pending" &&
            (todolist.filter((item) => {
              return item.completed === false;
            }).length > 0 ? (
              todolist
                .filter((item) => {
                  return item.completed === false;
                })
                .sort((a, b) => a.time - b.time)
                .map((item) => {
                  return (
                    <div
                      key={item.id}
                      className={`flex items-center border-cyan-500 border rounded px-1 ${
                        currid === item.id && "border-dashed"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 outline-none mr-2 bg-cyan-600"
                        checked={selectedForCompleted.includes(item.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSetlectedForCompleted((prev) => {
                              return [...prev, item.id];
                            });
                          } else {
                            setSetlectedForCompleted((prev) => {
                              let arr = prev.filter((el) => {
                                return el !== item.id;
                              });
                              return [...arr];
                            });
                          }
                        }}
                      />
                      <p
                        className="grow font-openSans text-base p-1 cursor-pointer"
                        onClick={() => {
                          setNewval(item.title);
                          setCurrid(item.id);
                        }}
                      >
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
                })
            ) : (
              <div className="flex flex-col gap-4 items-center justify-center w-full h-full text-cyan-900">
                <TbLayoutDashboard />
                <p className="font-openSans text-lg p-1 font-semibold">
                  Nothing Pending
                </p>
              </div>
            ))}
          {curr === "completed" &&
            (todolist.filter((item) => {
              return item.completed === true;
            }).length > 0 ? (
              todolist
                .filter((item) => {
                  return item.completed === true;
                })
                .sort((a, b) => a.time - b.time)
                .map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="flex items-center border-cyan-500 border rounded px-1"
                    >
                      <input
                        type="checkbox"
                        checked={selectedForDeleting.includes(item.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedFordeleting((prev) => {
                              return [...prev, item.id];
                            });
                          } else {
                            setSelectedFordeleting((prev) => {
                              let arr = prev.filter((el) => {
                                return el !== item.id;
                              });
                              return [...arr];
                            });
                          }
                        }}
                      />
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
                })
            ) : (
              <div className="flex flex-col gap-4 items-center justify-center w-full h-full text-cyan-900">
                <TbLayoutDashboard />
                <p className="font-openSans text-lg p-1 font-semibold">
                  Nothing Here
                </p>
              </div>
            ))}
        </div>
        <div className="w-full flex items-center gap-2">
          <input
            type="text"
            value={newval}
            placeholder="Type your todo here!"
            className="grow rounded-md outline-none font-poppins text-base px-2 py-1"
            onChange={(e) => {
              setNewval(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleChange();
              }
            }}
          />
          <button className="btn-2">
            <VscAdd
              className="w-4 h-4"
              onClick={() => {
                handleChange();
              }}
            />
          </button>
        </div>
      </div>
      {selectedForCompleted.length > 0 && (
        <button
          className="floating-btn"
          onClick={() => {
            markMultipleCompleted(selectedForCompleted);
          }}
        >
          <VscClose className="w-4 h-4" />
        </button>
      )}
      {selectedForDeleting.length > 0 && (
        <button
          className="floating-btn"
          onClick={() => {
            deleteMultiple(selectedForDeleting);
          }}
        >
          <AiOutlineDelete className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export default App;
