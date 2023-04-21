import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useToDo } from "../contexts/TodoContext";

const Completed = ({ item, selectedForDeleting, setSelectedFordeleting }) => {
  const { deleteTodo } = useToDo();
  return (
    <div
      key={item.id}
      className="flex items-center border-cyan-500 border rounded px-1"
    >
      <input
        type="checkbox"
        className="w-4 h-4 outline-none mr-2 bg-cyan-600"
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
      <p className="grow font-openSans text-base p-1">{item.title}</p>
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
};

export default Completed;
