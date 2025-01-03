import { createSlice } from "@reduxjs/toolkit";
import React from "react";

export interface User {
  id: number;
  name: string;
}

interface State {
  users: User[];
}

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    addUser(state: State, action: { payload: User }) {
      state.users.push(action.payload);
    },
    updateUser(state: State, action: { payload: User }) {
      const userIndex = state.users.findIndex(user => user.id === action.payload.id);
      if (userIndex !== -1) {
        state.users[userIndex] = { ...state.users[userIndex], ...action.payload };
      }
    },
    deleteUser(state: State, action: { payload: User }) {
      state.users = state.users.filter((user) => user.id !== action.payload.id);
    },
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
