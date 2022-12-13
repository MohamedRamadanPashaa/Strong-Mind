import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Result should be belong to user."],
    },
    score: {
      type: Number,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    table: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Result", resultSchema);
