import { createSlice } from "@reduxjs/toolkit";

type UserState = {
	name: string;
	imgUrl: string;
};
const userSlice = createSlice({
	name: "user",
	initialState: {},
	reducers: {},
});
