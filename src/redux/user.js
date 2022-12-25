/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export const logIn = createAsyncThunk(
  'user/saveUser',
  async ({ email, password }) => {
    await signInWithEmailAndPassword(auth, email, password);
  },
);

// eslint-disable-next-line import/prefer-default-export
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    position: null,
  },
  reducers: {
    saveUser: (state, action) => {
      state.userData = action.payload;
    },
    unsaveUser: (state) => {
      state.userData = null;
    },
    savePosition: (state, action) => {
      state.position = action.payload;
    },
  },
});

export const { saveUser, unsaveUser, savePosition } = userSlice.actions;

export default userSlice.reducer;
