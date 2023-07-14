import { configureStore } from "@reduxjs/toolkit";
import history from "./slices/historySlice";

export default configureStore({
	reducer: { history },
});
