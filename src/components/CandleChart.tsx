"use client";
import useCandleData from "@/hooks/useCandleData";
import { backTestBot } from "@/service/client/strategy";
import { chartOptions } from "@/service/server/options";
import Chart from "react-apexcharts";

export default function CandleChart() {
	const options = chartOptions;
	const {
		candleQuery: { data: candleObj },
	} = useCandleData({ lte: 1, id: 1 });
	if (!candleObj) return;

	const candles: historyKlineData = candleObj.reduce(
		(acc: historyKlineData, cur: historyKline) => [...acc, ...cur.data],
		[]
	);

	const data = candles.map((candle, idx) => ({
		x: idx,
		y: [
			...candle
				.slice(1, 5) //
				.map((num) => Number(num)),
		],
	}));
	const indicators = backTestBot({ candles, ma1: 12, ma2: 26 });
	console.log(indicators);
	console.log(data);
	return (
		<div className="bg-white p-4 px-2 my-2 rounded-xl">
			<Chart
				options={{
					...options, //
					// annotations: { yaxis },
				}}
				series={[
					{
						name: "candle",
						type: "candlestick",
						data,
					},
					{
						name: "ma1",
						type: "line",
						data: indicators.ma1,
					},
				]}
				type="candlestick"
				height={350}
			/>
		</div>
	);
}
