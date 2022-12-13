import React from "react";
import Table from "./Table";

const Tablebody = ({ results }) => {
  return (
    <tbody>
      {results.map((result, index) => (
        <Table key={result._id} {...result} index={index + 1} />
      ))}
    </tbody>
  );
};

export default Tablebody;
