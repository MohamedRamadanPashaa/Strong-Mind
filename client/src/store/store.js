import { configureStore } from "@reduxjs/toolkit";

import resultReducer from "./resultSlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    result: resultReducer,
    auth: authReducer,
  },
});

export default store;
