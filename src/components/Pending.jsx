import React from "react";
import { VscClose } from "react-icons/vsc";
import { useToDo } from "../contexts/TodoContext";

const Pending = ({
  item,
  currid,
  selectedForCompleted,
  setSetlectedForCompleted,
  setNewval,
  setCurrid,
}) => {
  const { markCompleted } = useToDo();
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
};

export default Pending;
