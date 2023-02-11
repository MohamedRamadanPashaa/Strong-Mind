import React, { useEffect } from "react";
import useHttp from "../../hooks/http-hook";
import ErrorModal from "../ErrorModal/ErrorModal";
import Loading from "../UIElements/Loading";

import classes from "./MainTable.module.css";
import Tablebody from "./Tablebody";

let objectOne = [];
let objectTwo = [];
let action = [];

const MainTable = ({ title }) => {
  // eslint-disable-next-line
  const { isLoading, error, sendRequest, clearError } = useHttp();

  useEffect(() => {
    const request = async () => {
      try {
        const data = await sendRequest(`api/v1/results/rank/${title}`);

        const res = data.data;
        res.sort(function (a, b) {
          if (a.score === b.score) {
            return a.time - b.time;
          }

          return b.score > a.score ? 1 : -1;
        });

        if (title === "Object One") {
          objectOne = res;
        } else if (title === "Object Two") {
          objectTwo = res;
        } else if (title === "Action") {
          action = res;
        }
      } catch (error) {
        console.log(error);
      }
    };

    request();
  }, [sendRequest, title]);

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />
      {objectOne.length !== 0 || objectTwo.length !== 0 || action.length !== 0 ? (
        <table className={classes.table}>
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Score</th>
              <th>Time (sec)</th>
            </tr>
          </thead>
          {title === "Object One" && <Tablebody results={objectOne} />}
          {title === "Object Two" && <Tablebody results={objectTwo} />}
          {title === "Action" && <Tablebody results={action} />}
        </table>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default MainTable;
