import React, { MouseEvent, useState } from "react";

const CounterApp = () => {
  const [counter, setCounter] = useState<number>(0);

  const decreaseCounter = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (counter === 0) return;
    setCounter((prevState) => {
      return prevState - 1;
    });
  };

  const increaseCounter = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCounter((prevState) => {
      return prevState + 1;
    });
  };

  return (
    <div style={styles.container}>
      <h3>Counter App</h3>
      <h5>{counter}</h5>
      <div style={{ display: "flex", gap: "10px" }}>
        <button style={styles.buttonStyle} onClick={decreaseCounter}>
          -
        </button>
        <button style={styles.buttonStyle} onClick={increaseCounter}>
          +
        </button>
      </div>
    </div>
  );
};

export default CounterApp;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    padding: "4px 15px",
    backgroundColor: "black",
    border: "2px solid grey",
    color: "white",
    borderRadius: "12px",
    width: "60px",
    cursor: "pointer",
  },
};
