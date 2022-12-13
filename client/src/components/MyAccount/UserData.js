import PasswordChange from "./PasswordChange";
import UserInfoChange from "./UserInfoChange";

import classes from "./UserData.module.css";

const UserData = () => {
  return (
    <div className={classes.userData}>
      <UserInfoChange />

      <PasswordChange />
    </div>
  );
};

export default UserData;
