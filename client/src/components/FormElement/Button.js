import React from "react";
import { Link } from "react-router-dom";

import classes from "./Button.module.css";

const Button = ({
  to,
  children,
  onClick,
  className,
  outline,
  disabled,
  type,
}) => {
  if (to) {
    return (
      <Link
        className={`${classes.btn} ${
          outline && classes.btnOutline
        } ${className}`}
        to={to}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <button
        type={type}
        className={`${outline ? classes.btnOutline : classes.btn} ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
};

export default Button;
