import { configureStore } from "@reduxjs/toolkit";
import activeChatSlice from "./slices/activeChat";
import userSlice from "./slices/userSlice";

export default configureStore({
  reducer: {
    activeChat: activeChatSlice,
    userLoginInfo: userSlice,
  },
});
