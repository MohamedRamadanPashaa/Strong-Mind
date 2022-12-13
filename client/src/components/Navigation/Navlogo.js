import React from "react";
import { Link } from "react-router-dom";

import classes from "./Navlogo.module.css";

const Navlogo = () => {
  return (
    <h1 className={classes.logo}>
      <Link to="/">Strong Mind</Link>
    </h1>
  );
};

export default Navlogo;
