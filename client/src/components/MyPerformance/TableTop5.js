import React from "react";

import classes from "./MyPerformance.module.css";
import TableRow from "./TableRow";

const TableTop5 = ({ results }) => {
  return (
    results.length > 0 && (
      <table className={classes.MyPerformance}>
        <caption>{results[0].table}</caption>
        <thead>
          <tr>
            <th>No</th>
            <th>Score</th>
            <th>Time</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <TableRow key={result._id} index={index + 1} {...result} />
          ))}
        </tbody>
      </table>
    )
  );
};

export default TableTop5;
