import User from "../models/userModel.js";
import Token from "../models/token.js";
import sendEmail from "../utils/sendEmail.js";
import AppError from "../utils/appError.js";
import crypto from "crypto";
import catchAsync from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { promisify } from "util";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = createToken(user._id);

  res.cookie("two_digit_token", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  const token = await new Token({
    userId: newUser._id,
    token: crypto.randomBytes(32).toString("hex"),
  }).save();

  const url = `https://strong-mind.onrender.com/user:${newUser._id}:${token.token}`;

  sendEmail(
    newUser,
    "Verify My Email",
    url,
    "Here is your activation link, Please press on the bellow link and follow instruction to activate your email."
  );

  res.status(StatusCodes.CREATED).json({
    message: "An email sent to your email please verify your account.",
  });
});

export const verifyEmail = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id });

  if (!user) {
    return next(
      new AppError("This user does not longer exist.", StatusCodes.NOT_FOUND)
    );
  }

  const token = await Token.findOne({
    userId: user._id,
    token: req.params.token,
  });

  if (!token) {
    return next(
      new AppError(
        "This link is invalid or expired, try to get new one by login again.",
        StatusCodes.NOT_FOUND
      )
    );
  }

  user.verified = true;
  await user.save({ validateBeforeSave: false });
  await token.remove();

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "email verified successfully, Log in now.",
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new AppError(
        "Please provide email and password.",
        StatusCodes.BAD_REQUEST
      )
    );
  }
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(
      new AppError(
        "No user found with this email, Please sign up instead.",
        StatusCodes.NOT_FOUND
      )
    );
  }

  if (!(await user.comparePasswords(password, user.password))) {
    return next(
      new AppError(
        "The email and password don't match.",
        StatusCodes.UNAUTHORIZED
      )
    );
  }

  if (!user.verified) {
    const token = await Token.findOne({ userId: user._id });

    if (!token) {
      const token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();

      const url = `https://strong-mind.onrender.com/user:${user._id}:${token.token}`;

      sendEmail(
        user,
        "Verify My Email",
        url,
        "Here is your activation link, Please press on the bellow link and follow instruction to activate your email."
      );
    }

    return res.status(StatusCodes.UNAUTHORIZED).json({
      status: "fail",
      message: "Your account not verified yet, we sent you email to verify.",
    });
  }

  createSendToken(user, StatusCodes.OK, req, res);
});

export const logout = (req, res) => {
  res.cookie("two_digit_token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });

  res
    .status(StatusCodes.OK)
    .json({ status: "success", message: "Logged out successfully." });
};

export const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.two_digit_token) {
    token = req.cookies.two_digit_token;
  }

  if (!token) {
    return next(
      new AppError(
        "You are not logged in, Please log in first.",
        StatusCodes.UNAUTHORIZED
      )
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new AppError(
        "The user belong this id does not longer exist",
        StatusCodes.NOT_FOUND
      )
    );
  }

  if (currentUser.passwordChangedAfter(decoded.iat)) {
    return next(
      new AppError(
        "User recently changed his password! Please log in again.",
        StatusCodes.UNAUTHORIZED
      )
    );
  }

  req.userId = currentUser.id;
  // res.locals.user = currentUser;
  next();
});

const filterObject = (obj, ...allowedFields) => {
  const newObj = {};

  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

export const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new AppError("No user found with this id.", StatusCodes.NOT_FOUND)
    );
  }

  res.status(StatusCodes.OK).json({
    status: "success",
    data: user,
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const { password, passwordConfirm } = req.body;

  const { id } = req.params;

  const currentUser = await User.findById(id);

  if (!currentUser) {
    return next(
      new AppError(
        "You are not logged in, please log in first.",
        StatusCodes.UNAUTHORIZED
      )
    );
  }

  if (password || passwordConfirm) {
    return next(
      new AppError(
        "This route is not for change password.",
        StatusCodes.BAD_REQUEST
      )
    );
  }

  const filteredBody = filterObject(req.body, "name", "email", "birthday");

  // if (req.file) filteredBody.photo = req.file.filename;

  const updatedUser = await User.findByIdAndUpdate(id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "User data updated successfully!",
    data: updatedUser,
  });
});

export const updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.userId).select("+password");

  if (!(await user.comparePasswords(req.body.currentPassword, user.password))) {
    return next(new AppError("Your current password is wrong!", 401));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;

  await user.save();

  res.status(200).json({
    status: "success",
    message: "Password changed successfully.",
  });
});

export const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(
      new AppError(
        "No user found with this email address",
        StatusCodes.NOT_FOUND
      )
    );
  }

  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false });

  try {
    const url = `https://strong-mind.onrender.com/reset-password/${resetToken}`;

    sendEmail(
      user,
      "Reset The Password",
      url,
      "Here is your password reset link, Please press on the bellow link and follow instruction to reset your password."
    );

    res.status(StatusCodes.OK).json({
      status: "success",
      message:
        "An email sent to you, Please check your email and follow the instructions.",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        "There is an error sending the email. Try again later!",
        StatusCodes.INTERNAL_SERVER_ERROR
      )
    );
  }
});

export const resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new AppError(
        "This link is not correct or expired, Please try to reset your password again.",
        StatusCodes.BAD_REQUEST
      )
    );
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;

  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  res.status(StatusCodes.OK).json({
    status: "success",
    message:
      "Your password changed successfully, You can now login again with your new password.",
  });
});

export const isLoggedIn = async (req, res, next) => {
  const token = req.cookies.two_digit_token;

  if (!token) {
    return next(
      new AppError(
        "Authentication Invalid, Please Login again.",
        StatusCodes.UNAUTHORIZED
      )
    );
  }

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return next(
        new AppError(
          "Authentication Invalid, Please Login again.",
          StatusCodes.UNAUTHORIZED
        )
      );
    }

    if (currentUser.passwordChangedAfter(decoded.iat)) {
      return next(
        new AppError(
          "Authentication Invalid, Please Login again.",
          StatusCodes.UNAUTHORIZED
        )
      );
    }

    res.status(StatusCodes.OK).json({ user: currentUser });
  } catch (error) {
    return next(
      new AppError(
        "Authentication Invalid, Please Login again.",
        StatusCodes.UNAUTHORIZED
      )
    );
  }
};
