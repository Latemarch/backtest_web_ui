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
