import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { v4 as uuidv4 } from "uuid";

const TodoContext = createContext({});

export const useToDo = () => useContext(TodoContext);

const TodoProvider = ({ children }) => {
  const [todolist, setTodolist] = useState(
    JSON.parse(localStorage.getItem("todos")) || []
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todolist));
  }, [todolist]);

  const createTodo = (val) => {
    let oldList = todolist;
    oldList.push({
      id: uuidv4(),
      title: val,
      completed: false,
      time: new Date(),
    });
    setTodolist(oldList);
  };

  const updateTodo = (val, id) => {
    let oldList = todolist;
    oldList.forEach((item) => {
      if (item.id === id) {
        item.title = val;
      }
    });
    setTodolist(oldList);
  };

  const markCompleted = (id) => {
    let oldList = todolist;
    oldList.forEach((item) => {
      if (item.id === id) {
        item.completed = true;
      }
    });
    setTodolist(oldList);
  };

  const markMultipleCompleted = (arr) => {
    let oldList = todolist;
    oldList.forEach((item) => {
      if (arr.includes(item.id)) {
        item.completed = true;
      }
    });
    setTodolist(oldList);
  };

  const deleteTodo = (id) => {
    let oldList = todolist;
    oldList.filter((item) => {
      return item.id !== id;
    });
    setTodolist(oldList);
  };

  const deleteMultiple = (arr) => {
    let oldList = todolist;
    oldList.filter((item) => {
      return !arr.includes(item.id);
    });
    setTodolist(oldList);
  };
  return (
    <TodoContext.Provider
      value={{
        todolist,
        setTodolist,
        createTodo,
        markCompleted,
        deleteTodo,
        updateTodo,
        markMultipleCompleted,
        deleteMultiple,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoProvider;
