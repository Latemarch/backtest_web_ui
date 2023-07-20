import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type TextState = {
	[key: string]: string;
};

const textSlice = createSlice({
	name: "text",
	initialState: {} as TextState,
	reducers: {
		setText: (
			state: TextState,
			action: PayloadAction<{ key: string; value: string }>
		) => {
			const { key, value } = action.payload;
			state[key] = value;
		},
	},
});

export const { setText } = textSlice.actions;
export default textSlice.reducer;
