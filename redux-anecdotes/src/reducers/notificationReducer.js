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



export const { setNotification } = notificationSlice.actions;

let timeoutVote = null

export const voteNotification = (message, delay) => {
  return async (dispatch) => {
    dispatch(setNotification(message))
    if (timeoutVote) {
      clearTimeout(timeoutVote)
    }
    timeoutVote = setTimeout(() => dispatch(setNotification(null)), delay * 1000)
  };
};

export default notificationSlice.reducer;
