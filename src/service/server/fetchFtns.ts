import axios from "axios";
import path from "path";
import fs from "fs";
const isLocal = process.env.ISLOCAL === "local" ? true : false;
const domain = process.env.NEXT_PUBLIC_API_URL;
const axiosInstance = axios.create({
	baseURL: domain,
});

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

export const getUserBalance = async () => {
	const res = await fetch(`${domain}/api/user/balance`, { cache: "no-store" });
	if (!res.ok) {
		const message = await res.text();
		console.error("API error:", message);
	}
	const data = await res.json();
	return data.data.balance;
};

export const getCandles = async (
	gte: number | undefined,
	lte: number | undefined
): Promise<historyKlineData[]> => {
	const result = [];
	if (isLocal) {
		console.log("local datas");
		for (let i = 0; i < 2; i++) {
			let str = i.toString().padStart(3, "0");
			const filePath = path.join(
				process.cwd(),
				"public",
				"datas",
				`${str}.json`
			);
			const fileContents = JSON.parse(fs.readFileSync(filePath, "utf8"));
			result.push(fileContents);
		}
		return result;
	}
	const data: historyKline[] = await axios
		.get("http://localhost:3000/api/datas/", {
			params: {
				gte,
				lte,
			},
		})
		.then((res) => res.data);
	const filteredData = data.map((obj) => obj.data);
	return filteredData;
};

export const getLocalCandles = async (
	gte: number | undefined = 0,
	lte: number | undefined = 60
): Promise<historyKlineData[]> => {
	const result = [];
	for (let i = 0; i < lte; i++) {
		let str = i.toString().padStart(3, "0");
		const filePath = path.join(process.cwd(), "public", "datas", `${str}.json`);
		const fileContents = JSON.parse(fs.readFileSync(filePath, "utf8"));
		result.push(fileContents);
	}
	return result;
};
