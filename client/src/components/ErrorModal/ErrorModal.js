import React from "react";
import Button from "../FormElement/Button";
import Modal from "../Modal/Modal";

const ErrorModal = ({ error, onCancel }) => {
  return (
    <Modal
      show={!!error}
      header="An Error Occurred!"
      onCancel={onCancel}
      footer={<Button onClick={onCancel}>Okay</Button>}
    >
      <p>{error}</p>
    </Modal>
  );
};

export default ErrorModal;
