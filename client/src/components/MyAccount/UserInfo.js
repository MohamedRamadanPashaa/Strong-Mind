import React from "react";
import { NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faChartLine } from "@fortawesome/free-solid-svg-icons";

import classes from "./UserInfo.module.css";

const UserInfo = () => {
  return (
    <div className={classes.userInfo}>
      <ul>
        <li>
          <NavLink
            to="my-account"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            <FontAwesomeIcon icon={faUser} /> My Account
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
            to="my-performance"
          >
            <FontAwesomeIcon icon={faChartLine} />
            My Performance
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserInfo;
