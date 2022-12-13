import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ErrorModal from "../components/ErrorModal/ErrorModal";
import Button from "../components/FormElement/Button";
import Input from "../components/FormElement/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../components/utils/validators";
import useForm from "../hooks/form-hook";
import useHttp from "../hooks/http-hook";
import { login } from "../store/authSlice";

import classes from "./Login.module.css";

const Login = () => {
  const [loginMode, setLoginMode] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { isLoading, error, sendRequest, clearError } = useHttp();

  const [formState, inputHandler, setFormData] = useForm(
    {
      password: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const changeMode = () => {
    if (!loginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          passwordConfirm: undefined,
          birthday: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
          birthday: {
            value: "",
            isValid: false,
          },
          passwordConfirm: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }

    setLoginMode((prev) => !prev);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (loginMode) {
      try {
        const data = await sendRequest(
          "api/v1/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        dispatch(
          login({
            user: data.data.user,
          })
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const data = await sendRequest(
          "api/v1/users/signup",
          "POST",
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            passwordConfirm: formState.inputs.passwordConfirm.value,
            birthday: formState.inputs.birthday.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        setSuccessMsg(data.message);
      } catch (error) {}
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />

      <form onSubmit={submitHandler} className={classes.form}>
        <h3>{loginMode ? "Login to your account" : "Create new account"}</h3>
        <hr />

        {successMsg ? (
          <p className={classes.success}>{successMsg}</p>
        ) : (
          <>
            {!loginMode && (
              <Input
                type="text"
                label="Your Name"
                placeholder="Ex:- John Ekbal"
                id="name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please provide your name."
                onInput={inputHandler}
              />
            )}
            <Input
              type="email"
              label="E-Mail"
              placeholder="Ex:- example@gmail.com"
              id="email"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please provide a valid email."
              onInput={inputHandler}
            />
            <Input
              type="password"
              label="Password"
              placeholder="********"
              id="password"
              validators={[VALIDATOR_MINLENGTH(8)]}
              errorText="The password should be at least 6 charachters."
              onInput={inputHandler}
            />
            {!loginMode && (
              <Input
                type="password"
                label="Password Confirm"
                placeholder="********"
                id="passwordConfirm"
                validators={[VALIDATOR_MINLENGTH(8)]}
                errorText="The passwords are not the same."
                onInput={inputHandler}
              />
            )}
            {!loginMode && (
              <Input
                type="date"
                label="Birthday"
                id="birthday"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please provide your birthday."
                onInput={inputHandler}
              />
            )}

            <Button
              className={classes.btn}
              type="submit"
              disabled={!formState.isValid || isLoading}
            >
              {isLoading ? "Loading..." : loginMode ? "Log In" : "Sign Up"}
            </Button>

            <Button
              type="button"
              outline="true"
              onClick={changeMode}
              className={classes.btn}
            >
              {loginMode ? "Create new account" : "login to your account"}
            </Button>
          </>
        )}
        {loginMode && (
          <p className={classes.forgot}>
            Forgot Your Password?{" "}
            <Link to="/forgot-password">Reset Password</Link>
          </p>
        )}
      </form>
    </>
  );
};

export default Login;
