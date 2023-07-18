"use client";
import useCandleData from "@/hooks/useCandleData";
import { backTestBot } from "@/service/client/strategy";
import { combineCandles, mapCandleData } from "@/service/client/utils";
import { chartBar, chartOptions } from "@/service/server/options";
import { useState } from "react";
import Chart from "react-apexcharts";

export default function CandleChart() {
	const [xaxis, setXaxis] = useState({});
	const [yaxis, setYaxis] = useState({});
	const optionsCandle = chartOptions;
	const optionsBar = chartBar;
	const {
		candleQuery: { data: candleArr },
	} = useCandleData({ lte: 1, id: 1 });
	if (!candleArr) return;

	const candles = combineCandles(candleArr);

	const indicators = backTestBot({
		candles,
		ma1: 12,
		ma2: 26,
		macd: 9,
		profitCount: 9,
		profitCut: 0.01,
		lossCut: 0.08,
	});

	const data = mapCandleData(candles);

	return (
		<div className="bg-white p-4 px-2 my-2 rounded-xl">
			<Chart
				options={{
					...optionsCandle, //
					chart: {
						...optionsCandle.chart,
						events: {
							zoomed: function (chartContext, { xaxis }) {
								setXaxis(xaxis);
								const min =
									indicators.macd
										.slice(xaxis.min, xaxis.max)
										.reduce((max, obj) => Math.min(max, obj.y), 1000) - 10;
								const max =
									indicators.macd
										.slice(xaxis.min, xaxis.max)
										.reduce((max, obj) => Math.max(max, obj.y), -1000) + 10;
								setYaxis({ min, max });
							},
						},
					},
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
					{
						name: "ma2",
						type: "line",
						data: indicators.ma2,
					},
					{
						name: "dots",
						type: "fill",
						data: indicators.long,
					},
				]}
				height={450}
			/>
			<Chart
				options={{
					...optionsBar, //
					xaxis: {
						type: "numeric",
						tickAmount: 4,
						...xaxis,
					},
					yaxis: {
						show: false,
						tickAmount: 10,
						...yaxis,
					},
				}}
				series={[
					{
						name: "macd",
						type: "bar",
						data: indicators.macd,
					},
					{
						name: "macd_sig",
						type: "line",
						data: indicators.macdSig,
					},
					{
						name: "macd_Osc",
						type: "line",
						data: indicators.macdOsc,
					},
				]}
				height={200}
			/>
		</div>
	);
}
