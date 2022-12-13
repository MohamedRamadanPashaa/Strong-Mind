import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import useForm from "../../hooks/form-hook";
import Button from "../FormElement/Button";
import Input from "../FormElement/Input";
import { VALIDATOR_EMAIL, VALIDATOR_REQUIRE } from "../utils/validators";
import useHttp from "../../hooks/http-hook";
import Expire from "../UIElements/Expire";
import ErrorModal from "../ErrorModal/ErrorModal";
import { changeUserName } from "../../store/authSlice";

const UserInfoChange = () => {
  const [formState, inputHandler, setFormData] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      birthday: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  const { user } = useSelector((state) => state.auth);

  const [updatedUser, setUpdatedUser] = useState({});

  const { isLoading, error, sendRequest, clearError } = useHttp();

  const userId = useSelector((state) => state.auth).user._id;
  const dispatch = useDispatch();

  useEffect(() => {
    setFormData(
      {
        name: {
          value: user.name,
          isValid: true,
        },
        email: {
          value: user.email,
          isValid: true,
        },
        birthday: {
          value: user.birthday,
          isValid: true,
        },
      },
      true
    );
  }, [setFormData, user]);

  const submitChangeHandler = async (e) => {
    e.preventDefault();

    try {
      const data = await sendRequest(
        `api/v1/users/${userId}`,
        "PATCH",
        JSON.stringify({
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          birthday: formState.inputs.birthday.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      console.log(data.data);

      setUpdatedUser(data);
      dispatch(changeUserName(data.data));
    } catch (error) {
      console.log(error);
    }
  };

  const clearUpdatedUser = () => setUpdatedUser({});

  return (
    <>
      <ErrorModal error={error} onCancel={clearError} />

      {
        <>
          <form onSubmit={submitChangeHandler}>
            <h3>Change Account Info</h3>

            <Input
              id="name"
              label="Name"
              type="text"
              placeholder="Ex:- John Aka"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              errorText="Please provide your name."
              initialValue={user.name}
              initialValid={true}
            />

            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="Ex:- JohenEkbal@gmail.com"
              validators={[VALIDATOR_EMAIL()]}
              onInput={inputHandler}
              errorText="Please provide your name."
              initialValue={user.email}
              initialValid={true}
            />

            <Input
              id="birthday"
              label="Birthday"
              type="Date"
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              errorText="Please provide your name."
              initialValue={user.birthday ? user.birthday.split("T")[0] : ""}
              initialValid={true}
            />
            <Button disabled={!formState.isValid || isLoading}>
              {isLoading ? "Loading..." : "Submit"}
            </Button>

            {updatedUser.status === "success" && (
              <Expire onCancel={clearUpdatedUser} delay={4000}>
                {updatedUser.message}
              </Expire>
            )}
          </form>
          <hr />
        </>
      }
    </>
  );
};

export default UserInfoChange;
