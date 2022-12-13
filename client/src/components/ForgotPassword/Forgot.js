import React, { useState } from "react";
import Button from "../FormElement/Button";
import Input from "../FormElement/Input";
import { VALIDATOR_EMAIL } from "../utils/validators";

import classes from "../../Pages/Login.module.css";
import useForm from "../../hooks/form-hook";
import useHttp from "../../hooks/http-hook";
import ErrorModal from "../ErrorModal/ErrorModal";

const Forgot = () => {
  const [succesMsg, setSuccesMsg] = useState("");

  // eslint-disable-next-line
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const { isLoading, error, sendRequest, clearError } = useHttp();

  const submitEmailHandler = async (e) => {
    e.preventDefault();

    try {
      const data = await sendRequest(
        "api/v1/users/forgot-password",
        "POST",
        JSON.stringify({
          email: formState.inputs.email.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      setSuccesMsg(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />

      <form onSubmit={submitEmailHandler} className={classes.form}>
        {!succesMsg ? (
          <>
            <h3>Add your email to verify</h3>
            <hr />
            <Input
              type="email"
              id="email"
              label="Your Email"
              errorText="Please provide a valid email."
              onInput={inputHandler}
              validators={[VALIDATOR_EMAIL()]}
            />
            <Button disabled={!formState.isValid || isLoading}>
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </>
        ) : (
          <p className={classes.success}>{succesMsg}</p>
        )}
      </form>
    </>
  );
};

export default Forgot;
