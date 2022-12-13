import AppError from "../utils/appError.js";

import { StatusCodes } from "http-status-codes";

const errorHandler = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong, Please try again later.",
  };

  if (err.name === "ValidationError") {
    customError.statusCode = StatusCodes.BAD_REQUEST;

    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(" ");
  }

  if (err.code && err.code === 11000) {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.message = `This ${Object.keys(err.keyValue)}: ${
      err.keyValue[Object.keys(err.keyValue)]
    } is already exist, Please provide another ${Object.keys(err.keyValue)}.`;
  }

  if (err.name === "CastError") {
    customError.msg = `No item found with Id: ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  return res
    .status(customError.statusCode)
    .json({ message: customError.message });
};

export default errorHandler;
