"use client";
import useCandleData from "@/hooks/useCandleData";
import CandleChart from "./CandleChart";

export default function ResultChartContainer() {
	const {
		candleQuery: { data: candleObj },
	} = useCandleData({ lte: 1, id: 1 });
	if (!candleObj) return;
	return (
		<div>
			<CandleChart />
		</div>
	);
}
