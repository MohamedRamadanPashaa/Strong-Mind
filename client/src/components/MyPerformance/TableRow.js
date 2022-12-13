import React from "react";

const TableRow = ({ score, time, createdAt, index }) => {
  const date = createdAt.split("T")[0].split("-");

  return (
    <tr>
      <td>{index}</td>
      <td>{score}</td>
      <td>{time}</td>
      <td>{`${date[2]}-${date[1]}-${date[0]}`}</td>
    </tr>
  );
};

export default TableRow;
