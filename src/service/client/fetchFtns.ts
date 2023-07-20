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
