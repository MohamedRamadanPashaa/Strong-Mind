import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Button from "../FormElement/Button";
import Dropdown from "./Dropdown";

import classes from "./Navlinks.module.css";

function Navlinks({ onCloseNavSmall, showNavSmall }) {
  const { user } = useSelector((state) => state.auth);
  const [showDropdown, setShowDropdown] = useState(false);

  const showDropdownHandler = () => setShowDropdown((prev) => !prev);

  return (
    <>
      <ul className={classes["nav"]}>
        <li onClick={onCloseNavSmall}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Home
          </NavLink>
        </li>
        {user && (
          <li onClick={onCloseNavSmall}>
            <NavLink
              to="/train"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Train
            </NavLink>
          </li>
        )}
        <li>
          <NavLink
            to="object-one-ranking"
            onClick={onCloseNavSmall}
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            Ranking
          </NavLink>
        </li>
        {!user && (
          <div onClick={onCloseNavSmall}>
            <Button outline="true" to="/login" className={classes.login}>
              Login
            </Button>
          </div>
        )}
        {user && (
          <div className={classes.navNamediv}>
            <Button onClick={showDropdownHandler} className={classes.myname}>
              {user.name.length <= 12 ? user.name : user.name.split(" ")[0]}
            </Button>
            <Dropdown
              showNavSmall={showNavSmall}
              onCloseNavSmall={onCloseNavSmall}
              show={showDropdown}
              onClick={showDropdownHandler}
            />
          </div>
        )}
      </ul>
    </>
  );
}

export default Navlinks;
