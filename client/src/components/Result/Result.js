import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useHttp from "../../hooks/http-hook";
import Button from "../FormElement/Button";

import classes from "./Result.module.css";

const Result = ({ dispatch, title }) => {
  const result = useSelector((state) => state.result);

  const { score, time } = result;

  // eslint-disable-next-line
  const { isLoading, error, sendRequest, clearError } = useHttp();

  useEffect(() => {
    if (title && score && time) {
      const result = async () => {
        try {
          await sendRequest(
            "api/v1/results",
            "POST",
            JSON.stringify({
              score,
              time: time / 1000,
              table: title,
            }),
            {
              "Content-Type": "application/json",
            }
          );
        } catch (error) {
          console.log(error);
        }
      };
      result();
    }
  }, [sendRequest, score, time, title]);

  return (
    <div className={classes.result}>
      <table>
        <thead>
          <tr>
            <th>Score</th>
            <th>Time</th>
            <th>Accuracy</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{score}</td>
            <td>{time / 1000} s</td>
            <td>{(score / 100) * 100}%</td>
          </tr>
        </tbody>
      </table>
      <Button
        outline
        className={classes.btn}
        onClick={() => dispatch({ type: "COUNTDOWN" })}
      >
        Another Game
      </Button>
    </div>
  );
};

export default Result;
