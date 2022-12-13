import React, { useState } from "react";
import { useParams } from "react-router";
import useForm from "../../hooks/form-hook";
import useHttp from "../../hooks/http-hook";
import ErrorModal from "../ErrorModal/ErrorModal";
import Button from "../FormElement/Button";
import Input from "../FormElement/Input";
import Expire from "../UIElements/Expire";
import { VALIDATOR_MINLENGTH } from "../utils/validators";

import classes from "../../Pages/Login.module.css";

const initialState = {
  passwordNew: {
    value: "",
    isValid: false,
  },
  passwordNewConfirm: {
    value: "",
    isValid: false,
  },
};

const PasswordReset = () => {
  // eslint-disable-next-line
  const [formState, inputHandler, setFormData] = useForm(initialState, false);

  const [successMsg, setSuccessMsg] = useState({});
  const { isLoading, sendRequest, error, clearError } = useHttp();

  const resetToken = useParams().resetToken;

  const changePasswordHandler = async (e) => {
    e.preventDefault();

    try {
      const data = await sendRequest(
        `api/v1/users/reset-password/${resetToken}`,
        "PATCH",
        JSON.stringify({
          password: formState.inputs.passwordNew.value,
          passwordConfirm: formState.inputs.passwordNewConfirm.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      setSuccessMsg(data);
    } catch (error) {
      console.log(error);
    }
  };

  const clearSuccessMsg = () => setSuccessMsg({});

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />
      <form onSubmit={changePasswordHandler} className={classes.form}>
        {successMsg.status === "success" ? (
          <>
            <Expire onCancel={clearSuccessMsg} delay={10000000}>
              {successMsg.message}
            </Expire>
            <Button
              className={classes.loginAfterResetBtn}
              outline="true"
              to="/login"
            >
              Login Now
            </Button>
          </>
        ) : (
          <>
            <h3>Reset your password</h3>
            <hr />
            <Input
              id="passwordNew"
              label="New Password"
              type="password"
              placeholder="*******"
              validators={[VALIDATOR_MINLENGTH(8)]}
              onInput={inputHandler}
              errorText="Password Should be at least 8 charachters"
            />

            <Input
              id="passwordNewConfirm"
              label="Confirm New Password"
              type="password"
              placeholder="*******"
              validators={[VALIDATOR_MINLENGTH(8)]}
              onInput={inputHandler}
              errorText="Password Confirm Should be at least 8 charachters"
            />

            <Button disabled={!formState.isValid || isLoading}>
              {isLoading ? "Loadding..." : "Submit"}
            </Button>
          </>
        )}
      </form>
    </>
  );
};

export default PasswordReset;
