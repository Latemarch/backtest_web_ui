import axios from "axios";
import path from "path";
import fs from "fs";
const isLocal = process.env.ISLOCAL === "local" ? true : false;
const domain = process.env.NEXT_PUBLIC_API_URL;

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

export const getLocalCandles = async (
	gte: number | undefined = 0,
	lte: number | undefined = 60
): Promise<historyKlineData[]> => {
	const result = [];
	for (let i = gte; i < lte; i++) {
		let str = i.toString().padStart(3, "0");
		const filePath = path.join(process.cwd(), "public", "datas", `${str}.json`);
		const fileContents = JSON.parse(fs.readFileSync(filePath, "utf8"));
		result.push(fileContents);
	}
	return result;
};
