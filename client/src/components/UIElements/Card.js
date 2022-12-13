import React from "react";
import { Link } from "react-router-dom";

import classes from "./Card.module.css";

const Card = ({ title, description, img, path }) => {
  return (
    <div className={classes.card}>
      <Link to={"/" + path}>
        <div className={classes.img}>
          <img src={img} alt={title} />
        </div>
        <div className={classes.text}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
};

export default Card;
