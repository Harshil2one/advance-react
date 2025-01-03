import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import thunkUserReducer from "../slice/thunkUserSlice";

const thunkStore = configureStore({
  reducer: {
    thunkUsers: thunkUserReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default thunkStore;
