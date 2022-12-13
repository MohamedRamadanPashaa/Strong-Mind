import React, { useEffect, useState } from "react";

import classes from "./CountDown.module.css";

const countSeconds = 5;

const CountDown = ({ dispatch }) => {
  const [time, setTime] = useState(countSeconds);
  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setTime((prevTime) => (prevTime -= 1));
    }, 1000);

    if (time === 0) {
      clearInterval(timer);
      dispatch({ type: "QUESTION" });
    }

    return () => {
      clearInterval(timer);
    };
  }, [time, dispatch]);

  return <div className={classes.countdown}>{time}</div>;
};

export default CountDown;
