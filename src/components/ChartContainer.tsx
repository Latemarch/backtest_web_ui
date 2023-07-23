"use client";
import useCandleData from "@/hooks/useCandleData";
import { combineCandles, mapCandleData } from "@/service/client/utils";
import { backTestBot } from "@/service/client/strategy";
import CandleChart from "./CandleChart";

export default function ChartContainer() {
	const {
		candleQuery: { data: candleArr },
	} = useCandleData({ lte: 1, id: 1 });
	if (!candleArr) return;
	const candles = combineCandles(candleArr);

	const indicators = backTestBot({
		candles,
		ma1: 12,
		ma2: 26,
		macd: 4,
		profitCount: 9,
		profitCut: 1,
		lossCut: -0.8,
	});

	const data = mapCandleData(candles);
	return <CandleChart data={data} indicators={indicators} />;
}
