import { createSlice } from "@reduxjs/toolkit";

const initialState = null;
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});

export const createNotification = (message, delay) => {
  return async (dispatch) => {
    dispatch(setNotification(message));
  };
};

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
