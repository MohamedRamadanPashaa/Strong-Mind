import React, { useEffect, useReducer } from "react";
import { validate } from "../utils/validators";

import classes from "./Input.module.css";

const reducerFunction = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };

    default:
      return state;
  }
};

const Input = ({
  type,
  label,
  placeholder,
  id,
  initialValue,
  initialValid,
  validators,
  errorText,
  onInput,
}) => {
  const [state, dispatch] = useReducer(reducerFunction, {
    value: initialValue || "",
    isValid: initialValid || false,
    isTouched: false,
  });

  const { value, isValid } = state;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (e) => {
    dispatch({ type: "CHANGE", val: e.target.value, validators: validators });
  };

  const touchHandler = (e) => {
    dispatch({ type: "TOUCH" });
  };

  let input;
  if (type === "textarea") {
    input = (
      <textarea
        id={id}
        placeholder={placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        rows={4}
        value={state.value}
      />
    );
  } else {
    input = (
      <input
        onChange={changeHandler}
        onBlur={touchHandler}
        type={type}
        placeholder={placeholder}
        id={id}
        value={state.value}
      />
    );
  }

  return (
    <div
      className={`${classes.form_input} ${
        !state.isValid && state.isTouched && classes.error
      }`}
    >
      <label htmlFor={id}>{label}</label>
      {input}
      {!state.isValid && state.isTouched && <p>{errorText}</p>}
    </div>
  );
};

export default Input;
