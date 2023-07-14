import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Props = {
	gte?: number;
	lte?: number;
};

export default function useCandleData({ gte, lte }: Props) {
	const candleQuery = useQuery(["candleData"], () => getCandle(gte, lte));

	return { candleQuery };
}

const getCandle = async (gte: number | undefined, lte: number | undefined) => {
	return axios
		.get("/api/data", {
			params: {
				gte,
				lte,
			},
		})
		.then((res) => res.data);
};
