import React, {
  useState,
  useReducer,
  createContext,
  useContext,
  useEffect,
} from "react";
import Third from "./Third";

export const StateAndDispatchContext = createContext();

export default function App() {
  // eslint-disable-next-line no-unused-vars
  const [ItemList, setItemList] = useState([
    { title: "x title", data: [1, 2, 3] },
    { title: "b title", data: [1, 2, 3] },
  ]);

  const [StateAndDispatch, setStateAndDispatch] = useState();

  useEffect(() => {}, [StateAndDispatch]);

  return (
    <div>
      <StateAndDispatchContext.Provider
        value={[StateAndDispatch, setStateAndDispatch]}
      >
        <h3>This is parent</h3>
        {ItemList.map((value, index) => {
          return <Child title={value.title} data={value.data} />;
        })}

        {StateAndDispatch && (
          <Third data={StateAndDispatch.sta} dispatch={StateAndDispatch.dis} />
        )}
      </StateAndDispatchContext.Provider>
    </div>
  );
}

function Child({ title, data }) {
  const Reducer = (state, action) => {
    switch (action.type) {
      case "add":
        console.log("add celled");
        return [...state, Math.floor(Math.random() * 543)];
      default:
        break;
    }
  };
  const [state, dispatch] = useReducer(Reducer, data);

  const [StateAndDispatch, setStateAndDispatch] = useContext(
    StateAndDispatchContext
  );

  const ShareStateAndDispatch = () => {
    const Objectconfig = {
      dis: dispatch,
      sta: state,
    };
    setStateAndDispatch(Objectconfig);
  };

  const AddItem = () => {
    dispatch({ type: "add" });
  };

  useEffect(() => {
    console.log("changed state");
    const Objectconfig = {
      dis: dispatch,
      sta: state,
    };
    setStateAndDispatch(Objectconfig);
  }, [setStateAndDispatch, state]);

  return (
    <div>
      <h3>this is child</h3>
      <button onClick={() => ShareStateAndDispatch()}>
        Share state and dispatch
      </button>

      <button onClick={() => AddItem()}>Add Item</button>
      {state.map((value, index) => {
        return <li key={index}> {value} </li>;
      })}
    </div>
  );
}
