import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setScore, setTimer } from "../../store/resultSlice";

const Timer = ({ numOfQ, dispatch, rightAnswers }) => {
  const [time, setTime] = useState(0);
  const [active, setActive] = useState(true);
  const [paused, setPaused] = useState(false);

  const dispatchResult = useDispatch();
  const { totalNumOfQuestion } = useSelector((state) => state.result);

  useEffect(() => {
    let timer;

    if (active && !paused) {
      timer = setInterval(() => {
        setTime((prvTime) => (prvTime += 10));
      }, 10);
    }

    if (numOfQ === totalNumOfQuestion) {
      clearInterval(timer);
      stopTimerHandler();

      dispatchResult(setTimer(time));
      dispatchResult(setScore(rightAnswers));
      dispatch({ type: "RESULT" });
    }

    return () => {
      clearInterval(timer);
    };
  }, [
    active,
    paused,
    numOfQ,
    dispatch,
    rightAnswers,
    dispatchResult,
    time,
    totalNumOfQuestion,
  ]);

  const stopTimerHandler = () => {
    setActive(false);
    setPaused(true);
  };

  return (
    <div>
      <span className="digits">
        {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
      </span>
      <span className="digits">
        {("0" + Math.floor((time / 1000) % 60)).slice(-2)}.
      </span>
      <span className="digits mili-sec">
        {("0" + ((time / 10) % 100)).slice(-2)}
      </span>
    </div>
  );
};

export default Timer;
