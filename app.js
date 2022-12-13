import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRoutes from "./routers/userRoutes.js";
import resultRoutes from "./routers/resultRoutes.js";
import "express-async-errors";
import AppError from "./utils/appError.js";
import errorHandler from "./controllers/errorController.js";
import cookieParser from "cookie-parser";

import morgan from "morgan";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

import path, { dirname } from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/results", resultRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// app.all("*", (req, res, next) => {
//   return next(
//     new AppError(`Can't find ${req.originalUrl} on this server.`, 404)
//   );
// });

app.use(errorHandler);

mongoose
  .connect(process.env.DATABASE_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("DB Connected Successfully"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on Port: ${PORT}`));
