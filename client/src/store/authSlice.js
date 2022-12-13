import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
    },

    logout: (state) => {
      state.user = null;
    },

    changeUserName: (state, action) => {
      state.user = action.payload;
    },

    isLoggedIn: (state, action) => {
      state.userLoading = false;
      state.user = action.payload.user;
    },

    isNotLoggedIn: (state) => {
      state.userLoading = false;
      state.user = null;
    },
  },
});

export const { login, logout, changeUserName, isLoggedIn, isNotLoggedIn } =
  authSlice.actions;

export default authSlice.reducer;
