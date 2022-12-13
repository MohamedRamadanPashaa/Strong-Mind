import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useHttp from "../../hooks/http-hook";
import TableTop5 from "./TableTop5";
import Loading from "../UIElements/Loading";

import classes from "./MyPerformance.module.css";
import ErrorModal from "../ErrorModal/ErrorModal";

let objectOne = [];
let objectTwo = [];
let action = [];

const MyPerformance = () => {
  // eslint-disable-next-line
  const { isLoading, sendRequest, error, clearError } = useHttp();

  const id = useSelector((state) => state.auth).user._id;

  useEffect(() => {
    const request = async () => {
      try {
        const { data } = await sendRequest(`api/v1/results/user-results`);

        objectOne = data.objectOne;
        objectTwo = data.objectTwo;
        action = data.action;
      } catch (error) {
        console.log(error);
      }
    };

    request();
  }, [sendRequest, id]);

  if (
    objectOne.length === 0 &&
    objectTwo.length === 0 &&
    action.length === 0 &&
    !isLoading
  ) {
    return (
      <div className={classes.mainTop5}>
        <h3>
          You don't have any results yet, Start train to see your top 5 scores.
        </h3>
      </div>
    );
  }

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />

      <div className={classes.mainTop5}>
        {objectOne.length !== 0 || !isLoading ? (
          <>
            <h3>Top 5 Scores in each discipline</h3>
            <TableTop5 results={objectOne} />
            <TableTop5 results={objectTwo} />
            <TableTop5 results={action} />
          </>
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default MyPerformance;
