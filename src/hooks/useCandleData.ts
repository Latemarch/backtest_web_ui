import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Props = {
	id?: number;
	gte?: number;
	lte?: number;
};

export default function useCandleData({ id, gte, lte }: Props) {
	const candleQuery = useQuery(["candleData"], () => getCandles(gte, lte));

	const getCandle = useQuery(["candleData", id], () => getCandleById(id));
	return { candleQuery, getCandle };
}

const getCandles = async (
	gte: number | undefined,
	lte: number | undefined
): Promise<historyKline[]> => {
	return axios
		.get("/api/data", {
			params: {
				gte,
				lte,
			},
		})
		.then((res) => res.data);
};

const getCandleById = async (id: number | undefined): Promise<historyKline> => {
	if (!id) throw new Error("id is undefined");
	return axios.get(`/api/data/${id}`).then((res) => res.data);
};
