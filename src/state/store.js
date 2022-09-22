import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import pageReducer from "./page/pageSlice";


export default configureStore({ 
  reducer: {
    auth: authReducer,
    page: pageReducer,
  }
})