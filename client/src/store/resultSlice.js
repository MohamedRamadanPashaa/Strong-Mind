import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  time: 0,
  score: 0,
  totalNumOfQuestion: 100,
};

const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    setScore: (state, action) => {
      state.score = action.payload;
    },
    setTimer: (state, action) => {
      state.time = action.payload;
    },
  },
});

export const { setScore, setTimer } = resultSlice.actions;

export default resultSlice.reducer;
