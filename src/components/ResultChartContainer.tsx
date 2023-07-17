"use client";
import useCandleData from "@/hooks/useCandleData";
import CandleChart from "./CandleChart";
import { backTestBot } from "@/service/client/strategy";

export default function ResultChartContainer() {
	const {
		candleQuery: { data: candleObj },
	} = useCandleData({ lte: 1, id: 1 });
	if (!candleObj) return;
	const candles: historyKlineData = candleObj.reduce(
		(acc: historyKlineData, cur: historyKline) => [...acc, ...cur.data],
		[]
	);
	return (
		<div>
			<CandleChart />
		</div>
	);
}
