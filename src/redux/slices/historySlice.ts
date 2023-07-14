import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: BackTestHistory = {
	profitNet: 0,
	profitLong: 0,
	profitShort: 0,
	history: { long: [], short: [] },
};
const historySlice = createSlice({
	name: "history",
	initialState,
	reducers: {
		addPosition: (state: BackTestHistory, action: PayloadAction<Trade>) => {
			const { position, time, price } = action.payload;
			const trade: TradeHistory = {
				buy: { time, price },
			};
			state.history[position].push(trade);
		},
		deletePosition: (state: BackTestHistory, action: PayloadAction<Trade>) => {
			const { position, time, price, profitCut, lossCut } = action.payload;
			const idx = state.history[position].length - 1;
			const trade = {
				time,
				price,
				profitCut: profitCut || false,
				lossCut: lossCut || false,
			};
			state.history[position][idx].sell = trade;
		},
	},
});

export const { addPosition, deletePosition } = historySlice.actions;
export default historySlice.reducer;
