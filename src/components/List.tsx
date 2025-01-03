import React from "react";
import { TodoItem } from "../pages/TodoHook";

const List = ({
  list,
  handleComplete,
  handleDelete,
}: {
  list: TodoItem[];
  handleComplete: (todoItem: TodoItem) => void;
  handleDelete: (todoItem: TodoItem) => void;
}) => {
  return (
    <>
      {list?.map((todoItem: TodoItem) => {
        return (
          <h5
            key={todoItem.id}
            style={{
              ...styles.todoItem,
              textDecoration: todoItem.completed ? "line-through" : "none",
            }}
            onClick={() => handleComplete(todoItem)}
            onDoubleClick={() => handleDelete(todoItem)}
          >
            {todoItem.task}
          </h5>
        );
      })}
    </>
  );
};

export default List;

const styles = {
  todoItem: {
    cursor: "pointer",
    border: "2px solid black",
    borderRadius: "10px",
    padding: "10px 20px",
  },
};
