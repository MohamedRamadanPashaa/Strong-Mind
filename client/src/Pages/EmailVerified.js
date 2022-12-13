import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Button from "../components/FormElement/Button";

import {
  faHouseCircleCheck,
  faCancel,
} from "@fortawesome/free-solid-svg-icons";

import classes from "./EmailVerified.module.css";
import { useParams } from "react-router";
import useHttp from "../hooks/http-hook";

const EmailVerified = () => {
  const [successMsg, setSuccessMsg] = useState("");
  // eslint-disable-next-line
  const { isLoading, error, sendRequest, clearError } = useHttp();

  const params = useParams();

  const { userIdAndToken } = params;
  const userId = userIdAndToken.split(":")[1];
  const token = userIdAndToken.split(":")[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await sendRequest(`api/v1/users/${userId}/${token}`);

        setSuccessMsg(data.message);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [userId, token, sendRequest]);

  return (
    <div className={`${classes.verified} ${error && classes.error}`}>
      {!isLoading ? (
        <>
          <div>
            {!error ? (
              <FontAwesomeIcon icon={faHouseCircleCheck} />
            ) : (
              <FontAwesomeIcon icon={faCancel} />
            )}
          </div>
          {successMsg && <h2>{successMsg}</h2>}
          {error && <h2>{error}</h2>}
          <Button to="/login" outline={"true"}>
            Login Now
          </Button>
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default EmailVerified;
