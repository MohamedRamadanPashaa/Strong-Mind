import React from "react";
import { useDispatch } from "react-redux";
import { Link, redirect } from "react-router-dom";

import { logout } from "../../store/authSlice";

import { CSSTransition } from "react-transition-group";

import "./Dropdown.css";
import useHttp from "../../hooks/http-hook";

const Dropdown = ({ show, onClick, onCloseNavSmall, showNavSmall }) => {
  const dispatch = useDispatch();
  const { sendRequest } = useHttp();

  const closeHandler = () => {
    onClick();

    if (showNavSmall) {
      onCloseNavSmall();
    }
  };

  const logoutHandler = async () => {
    try {
      const data = await sendRequest("api/v1/users/logout");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    redirect("/");
    dispatch(logout());
  };

  return (
    <CSSTransition
      in={show}
      mountOnEnter
      unmountOnExit
      timeout={200}
      classNames="dropdown"
    >
      <div className="drop-down-name" onClick={closeHandler}>
        <div>
          <Link to="my-account">My Account</Link>
        </div>
        <div>
          <Link onClick={logoutHandler}>Logout</Link>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Dropdown;
