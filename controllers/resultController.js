import { StatusCodes } from "http-status-codes";
import Result from "../models/resultModel.js";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import catchAsync from "../utils/catchAsync.js";

export const createResult = catchAsync(async (req, res) => {
  req.body.userId = req.userId;
  const newResult = await Result.create({
    ...req.body,
  });

  res.status(StatusCodes.OK).json({
    status: "success",
    data: newResult,
  });
});

export const getAllResults = catchAsync(async (req, res, next) => {
  const queryObject = { ...req.query };
  const excludedFields = ["page", "sort", "limit", "fields"];

  excludedFields.forEach((el) => delete queryObject[el]);

  let queryStr = JSON.stringify(queryObject);

  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  let results = Result.find(JSON.parse(queryStr));

  if (req.query.sort) {
    const sortList = req.query.sort.split(",").join(" ");
    results.sort(sortList);
  } else {
    results.sort("-createdAt");
  }

  if (req.query.limitFields) {
    const limitFields = req.query.limitFields.split(",").join(" ");
    results.select(limitFields);
  } else {
    results.select("-__v");
  }

  const page = +req.query.page || 1;
  const limit = +req.query.limit || 20;
  const skip = (page - 1) * limit;

  results.skip(skip).limit(limit);

  results = await results;

  if (results.length === 0) {
    return next(new AppError("This page is empty.", StatusCodes.NOT_FOUND));
  }

  res.status(StatusCodes.OK).json({
    status: "success",
    result: results.length,
    data: results,
  });
});

export const getUserResults = catchAsync(async (req, res, next) => {
  const id = req.userId;

  const objectOne = await Result.find({ userId: id, table: "Object One" })
    .sort("-score time")
    .limit(5);

  const objectTwo = await Result.find({ userId: id, table: "Object Two" })
    .sort("-score time")
    .limit(5);

  const action = await Result.find({ userId: id, table: "Action" })
    .sort("-score time")
    .limit(5);

  res.status(StatusCodes.OK).json({
    status: "success",
    data: { objectOne, objectTwo, action },
  });
});

export const getHighUserResult = catchAsync(async (req, res, next) => {
  const { table } = req.params;

  const highUserResult = await Result.aggregate([
    { $sort: { score: -1, time: 1 } },
    { $match: { table: table } },
    { $group: { _id: "$userId", group: { $first: "$$ROOT" } } },
    { $replaceRoot: { newRoot: "$group" } },
  ]);

  if (highUserResult.length === 0) {
    return next(new AppError("This page is empty.", StatusCodes.NOT_FOUND));
  }

  await User.populate(highUserResult, {
    path: "userId",
    select: { _id: 1, name: 1 },
  });

  res.status(StatusCodes.OK).json({
    status: "success",
    result: highUserResult.length,
    data: highUserResult,
  });
});
