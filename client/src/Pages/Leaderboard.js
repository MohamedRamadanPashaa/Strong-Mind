import React from "react";
import { NavLink, Outlet } from "react-router-dom";

import classes from "./Leaderboard.module.css";

const Leaderboard = () => {
  return (
    <div className={classes.leaderboard}>
      <ul>
        <li>
          <NavLink
            to="object-one-ranking"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Object One
          </NavLink>
        </li>
        <li>
          <NavLink
            to="object-two-ranking"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Object Two
          </NavLink>
        </li>
        <li>
          <NavLink
            to="action-ranking"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Action
          </NavLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};

export default Leaderboard;
