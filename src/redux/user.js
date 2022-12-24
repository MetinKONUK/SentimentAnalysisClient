/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';

// eslint-disable-next-line import/prefer-default-export
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    position: null,
  },
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload;
    },
    unsaveUser: (state) => {
      state.user = null;
    },
    savePosition: (state, action) => {
      state.position = action.payload;
    },
  },
});

export const { saveUser, unsaveUser, savePosition } = userSlice.actions;

export default userSlice.reducer;
