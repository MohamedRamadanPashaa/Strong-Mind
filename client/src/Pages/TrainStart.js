import Result from "../components/Result/Result";

import Prepare from "../components/TrainStartElements/Prepare";
import CountDown from "../components/TrainStartElements/CountDown";
import { useReducer } from "react";
import MainQuestion from "../components/TrainStartElements/MainQuestion";

const initialState = {
  prepare: true,
  countdown: false,
  question: false,
  result: false,
};

const dispatchHandler = (state, action) => {
  switch (action.type) {
    case "INIT":
      return { ...state };
    case "COUNTDOWN":
      return { ...state, prepare: false, countdown: true, result: false };
    case "QUESTION":
      return { ...state, countdown: false, question: true, result: false };
    case "RESULT":
      return { ...state, countdown: false, question: false, result: true };

    default:
      return initialState;
  }
};

const TrainStart = ({ title }) => {
  const [state, dispatch] = useReducer(dispatchHandler, initialState);

  return (
    <>
      {state.prepare && <Prepare dispatch={dispatch} title={title} />}
      {state.countdown && <CountDown dispatch={dispatch} />}
      {state.question && <MainQuestion dispatch={dispatch} title={title} />}
      {state.result && <Result dispatch={dispatch} title={title} />}
    </>
  );
};

export default TrainStart;
