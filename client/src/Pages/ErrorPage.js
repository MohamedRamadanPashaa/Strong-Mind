import React from "react";
import { useRouteError } from "react-router";
import Navbar from "../components/Navigation/Navbar";

import classes from "./ErrorPage.module.css";

const ErrorPage = () => {
  const error = useRouteError();
  return (
    <>
      <Navbar />
      <div className={classes.error}>
        <h2>Something went wrong!</h2>
        <p>{error.statusText}</p>
      </div>
    </>
  );
};

export default ErrorPage;
