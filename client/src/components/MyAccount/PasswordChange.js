import React, { useState } from "react";
import { useSelector } from "react-redux";
import useForm from "../../hooks/form-hook";
import useHttp from "../../hooks/http-hook";
import ErrorModal from "../ErrorModal/ErrorModal";
import Button from "../FormElement/Button";
import Input from "../FormElement/Input";
import Expire from "../UIElements/Expire";
import { VALIDATOR_MINLENGTH } from "../utils/validators";

const initialState = {
  password: {
    value: "",
    isValid: false,
  },
  passwordNew: {
    value: "",
    isValid: false,
  },
  passwordNewConfirm: {
    value: "",
    isValid: false,
  },
};

const PasswordChange = () => {
  // eslint-disable-next-line
  const [formState, inputHandler, setFormData] = useForm(initialState, false);

  const [successMsg, setSuccessMsg] = useState({});
  const { isLoading, sendRequest, error, clearError } = useHttp();
  const userId = useSelector((state) => state.auth).user._id;

  const changePasswordHandler = async (e) => {
    e.preventDefault();

    try {
      const data = await sendRequest(
        `api/v1/users/update-password/${userId}`,
        "PATCH",
        JSON.stringify({
          currentPassword: formState.inputs.password.value,
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
      <form onSubmit={changePasswordHandler}>
        <h3>Change Password</h3>
        <Input
          id="password"
          label="Current Password"
          type="password"
          placeholder="*******"
          validators={[VALIDATOR_MINLENGTH(8)]}
          onInput={inputHandler}
          errorText="Password Should be at least 8 charachters"
        />

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
        {successMsg.status === "success" && (
          <Expire onCancel={clearSuccessMsg} delay={4000}>
            {successMsg.message}
          </Expire>
        )}
      </form>
    </>
  );
};

export default PasswordChange;
