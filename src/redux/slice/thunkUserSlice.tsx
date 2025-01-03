import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface ThunkUser {
  id: number;
  name: string;
}

interface State {
  thunkUsers: ThunkUser[];
  loading: boolean;
  error: string | null;
}

export const fetchUsers = createAsyncThunk(
  "thunkUsers/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      return data as ThunkUser[];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const postUser = createAsyncThunk(
  "thunkUsers/postUser",
  async (userName: string, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: userName }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add user");
      }
      const data = await response.json();
      return data as ThunkUser;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const putUser = createAsyncThunk(
  "thunkUsers/putUser",
  async (updatedUser: ThunkUser, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${updatedUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      const data = await response.json();
      return data as ThunkUser;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUserAPI = createAsyncThunk(
  "thunkUsers/deleteUser",
  async (userId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      return userId;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const thunkUserSlice = createSlice({
  name: "thunkUsers",
  initialState: {
    thunkUsers: [],
    loading: false,
    error: null,
  } as State,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.thunkUsers = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(postUser.fulfilled, (state, action) => {
        state.thunkUsers.push(action.payload);
      })
      .addCase(postUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(putUser.fulfilled, (state, action) => {
        const index = state.thunkUsers.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.thunkUsers[index] = action.payload;
        }
      })
      .addCase(putUser.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteUserAPI.fulfilled, (state, action) => {
        state.thunkUsers = state.thunkUsers.filter(
          (user) => user.id !== action.payload
        );
      })
      .addCase(deleteUserAPI.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default thunkUserSlice.reducer;
