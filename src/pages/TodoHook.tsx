import React, {
  ChangeEvent,
  useCallback,
  useMemo,
  useReducer,
  useState,
} from "react";
import List from "../components/List";

export interface TodoItem {
  id: number;
  completed: boolean;
  task: string;
}

const TodoHook = () => {
  const initialTodos: TodoItem[] = [];
  const [todo, setTodo] = useState<string>("");

  const reducer = (
    state: TodoItem[],
    action: { type: string; id?: number }
  ) => {
    switch (action.type) {
      case "Add":
        setTodo("");
        return [
          ...state,
          {
            id: Math.random() * 100,
            task: todo,
            completed: false,
          },
        ];
      case "Complete":
        return state.map((todoItem) => {
          if (todoItem.id === action.id) {
            return { ...todoItem, completed: true };
          } else {
            return todoItem;
          }
        });
      case "Delete":
        return state.filter((todoItem) => todoItem.id !== action.id);
      default:
        return state;
    }
  };

  const [todos, dispatch] = useReducer(reducer, initialTodos);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    console.log("change");
    e.preventDefault();
    setTodo(e.target.value);
  }, []);

  const addTodo = () => {
    console.log("add called");
    dispatch({ type: "Add" });
  };

  const handleComplete = useCallback((todo: TodoItem) => {
    console.log("complete called");
    dispatch({ type: "Complete", id: todo.id });
  }, []);

  const handleDelete = (todo: TodoItem) => {
    console.log("delete called");
    dispatch({ type: "Delete", id: todo.id });
  };

  const completedTodos = useMemo(() => {
    console.log("completed memo");
    return todos.filter((todo) => todo.completed);
  }, [todos]);

  const incompleteTodos = useMemo(() => {
    console.log("incompleted memo");
    return todos.filter((todo) => !todo.completed);
  }, [todos]);

  return (
    <div style={styles.container}>
      <h3>Todo App</h3>
      <input
        style={{
          padding: "15px",
        }}
        value={todo}
        placeholder="Enter todo text"
        onChange={handleChange}
      />
      <button
        style={{
          ...styles.buttonStyle,
          ...(todo.length === 0 && {
            backgroundColor: "red",
            cursor: "not-allowed"
          }),
        }}
        onClick={addTodo}
        disabled={todo.length === 0}
      >
        Add
      </button>
      <div>
        <List list={todos} handleComplete={handleComplete} handleDelete={handleDelete} />
        <div style={styles.counters}>
          <h4>Completed Todos: {completedTodos.length}</h4>
          <h4>Incompleted Todos: {incompleteTodos.length}</h4>
        </div>
      </div>
    </div>
  );
};

export default TodoHook;

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
  counters: {
    marginTop: "100px",
  },
};
