import React from "react";

const Table = ({ index, userId, score, time }) => {
  return (
    <tr>
      <td>{index}</td>
      <td>{userId.name}</td>
      <td>{score}</td>
      <td>{time}</td>
    </tr>
  );
};

export default Table;
