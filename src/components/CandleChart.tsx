"use client";
import useCandleData from "@/hooks/useCandleData";
import { chartOptions } from "@/service/server/options";
import Chart from "react-apexcharts";

export default function CandleChart() {
	const options = chartOptions;
	const {
		candleQuery: { data: candles },
	} = useCandleData({ lte: 2, id: 1 });
	if (!candles) return;

	const candleArr: historyKlineData = candles.reduce(
		(acc: historyKlineData, cur: historyKline) => [...acc, ...cur.data],
		[]
	);

	const data = candleArr.map((candle, idx) => ({
		x: idx,
		y: [
			...candle
				.slice(1, 5) //
				.map((num) => Number(num.toFixed(0))),
		],
	}));

	return (
		<div className="bg-white p-4 px-2 my-2 rounded-xl">
			<Chart
				options={{
					...options, //
					// annotations: { yaxis },
				}}
				series={[
					{
						data,
					},
				]}
				type="candlestick"
				height={350}
			/>
		</div>
	);
}
