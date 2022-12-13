import React from "react";
import { Outlet } from "react-router-dom";
import UserInfo from "../components/MyAccount/UserInfo";

import classes from "./MyAccount.module.css";

const MyAccount = () => {
  return (
    <div className={classes.myAccount}>
      <UserInfo />
      <Outlet />
    </div>
  );
};

export default MyAccount;
