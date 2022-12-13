import React from "react";
import Button from "../FormElement/Button";

import classes from "./Prepare.module.css";

const Prepare = ({ title, dispatch }) => {
  const startTestHandler = () => {
    dispatch({ type: "COUNTDOWN" });
  };

  return (
    <div className={classes.trainStart}>
      <h2>{title}</h2>
      <p>
        You have 100 multiple-choice questions. Try to answer them correctly as
        quickly as possible.
      </p>
      <Button onClick={startTestHandler} className={classes.button}>
        Start
      </Button>
    </div>
  );
};

export default Prepare;
