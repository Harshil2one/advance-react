import React, { ChangeEvent, useState } from "react";

interface TodoItem { completed: boolean; task: string }

const Todo = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<TodoItem[]>(
    []
  );

  const handleTodo = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTodo(e.target.value);
  };

  const addTodo = () => {
    setTodo("");
    setTodos((prevState) => {
      return [...prevState, { task: todo, completed: false }];
    });
  };

  const handleComplete = (todo: TodoItem) => {
    const updatedTodos = todos.map((todoItem) => {
      return {
        ...todoItem,
        completed: todoItem.task === todo.task ? true : todoItem.completed,
      };
    });
    setTodos(updatedTodos);
  };

  const handleDelete = (todo: TodoItem) => {
    const filteredTodo = todos.filter((todoItem) => todoItem.task !== todo.task);
      setTodos(filteredTodo);
  };

  return (
    <div style={styles.container}>
      <h3>Todo App</h3>
      <input
        style={{
          padding: "15px",
        }}
        value={todo}
        placeholder="Enter todo text"
        onChange={handleTodo}
      />
      <button
        style={{
          ...styles.buttonStyle,
          ...(todo.length === 0 && { backgroundColor: "red" }),
        }}
        onClick={addTodo}
        disabled={todo.length === 0}
      >
        Add
      </button>
      <ul>
        {todos?.map((todoItem, index) => {
          return (
            <li
              key={todoItem.task}
              style={{
                textDecoration: todoItem.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
              onClick={() => handleComplete(todoItem)}
              onDoubleClick={() => handleDelete(todoItem)}
            >
              {todoItem.task}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Todo;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50px",
  },
  buttonStyle: {
    marginTop: "20px",
    padding: "4px 15px",
    backgroundColor: "black",
    border: "2px solid grey",
    color: "white",
    borderRadius: "12px",
    width: "60px",
    cursor: "pointer",
  },
};
