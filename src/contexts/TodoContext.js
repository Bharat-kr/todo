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
    setTodolist((prev) => {
      return [
        ...prev,
        {
          id: uuidv4(),
          title: val,
          completed: false,
          time: new Date(),
        },
      ];
    });
  };

  const updateTodo = (val, id) => {
    setTodolist((prev) => {
      prev.forEach((item) => {
        if (item.id === id) {
          item.title = val;
        }
      });
      return prev;
    });
  };

  const markCompleted = (id) => {
    setTodolist((prev) => {
      prev.forEach((item) => {
        if (item.id === id) {
          item.completed = true;
        }
      });
      return [...prev];
    });
  };

  const markMultipleCompleted = (arr) => {
    setTodolist((prev) => {
      prev.forEach((item) => {
        if (arr.includes(item.id)) {
          item.completed = true;
        }
      });
      return [...prev];
    });
  };

  const deleteTodo = (id) => {
    setTodolist((prev) => {
      let filtered = prev.filter((item) => {
        return item.id !== id;
      });
      return [...filtered];
    });
  };

  const deleteMultiple = (arr) => {
    setTodolist((prev) => {
      let filtered = prev.filter((item) => {
        return !arr.includes(item.id);
      });
      return [...filtered];
    });
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
