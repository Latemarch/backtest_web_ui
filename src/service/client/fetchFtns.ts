import axios from "axios";

export async function fetchTradeHistory() {
	const response = await axios.get(
		"https://api-testnet.bybit.com/v5/market/recent-trade",
		{
			params: {
				category: "spot",
				symbol: "BTCUSDT",
				interval: "1",
				limit: 200,
			},
		}
	);

	return response.data.result;
}
