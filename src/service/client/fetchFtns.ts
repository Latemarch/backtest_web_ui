import { ResultProps } from "@/app/api/results/route";
import axios from "axios";

const domain = process.env.NEXT_PUBLIC_API_URL;
const axiosInstance = axios.create({
	baseURL: domain,
});
export const getBTResult = async (constants: any) => {
	const res = await axiosInstance(`/api/results`, {
		params: { ...constants },
	});
	return res.data;
};

export async function postResult(Props: ResultProps) {
	const res = await axiosInstance.post("/api/results", {
		body: JSON.stringify(Props),
		headers: {
			"Content-Type": "application/json",
		},
	});
	return res;
}
export const getCandlesClient = async (
	gte: number | undefined,
	lte: number | undefined
): Promise<historyKlineData[]> => {
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
