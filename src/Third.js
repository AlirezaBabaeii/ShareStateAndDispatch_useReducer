import React, { useContext, useEffect } from "react";
import { StateAndDispatchContext } from "./App";

export default function Third({ data, dispatch }) {
  const [StateAndDispatch, setStateAndDispatch] = useContext(
    StateAndDispatchContext
  );
  const AddonThird = () => {
    if (StateAndDispatch) {
      StateAndDispatch.dis({ type: "add" });
    }
  };
  useEffect(() => {}, [StateAndDispatch]);

  console.log("re-render third");

  return (
    <div>
      <h3>Thrid</h3>
      <button onClick={() => AddonThird()}>Add Item on Third </button>
      {StateAndDispatch.sta.map((value, index) => {
        return <li key={index}>{value}</li>;
      })}
    </div>
  );
}
