"use client";
import { chartBar, chartOptions } from "@/service/server/options";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), {
	ssr: false,
});

export default function CandleChart({ data, indicators }: any) {
	const [xaxis, setXaxis] = useState({});
	const [yaxis, setYaxis] = useState({});
	const [annotations, setAnnotation] = useState<any[]>([]);
	const [candleYaxsis, setCandleYaxsis] = useState({
		min: undefined,
		max: undefined,
	});
	const optionsCandle = chartOptions;
	const optionsBar = chartBar;
	useEffect(() => {
		setAnnotation([
			...indicators.long.map((el: any) => ({
				x: el.x,
				borderColor: "#26A69A",
				label: {
					borderColor: "#26A69A",
					orientation: "horizontal",
					text: el.y,
				},
			})),
			...indicators.longSell.map((el: any) => ({
				x: el.x,
				borderColor: "#EF5350",
				label: {
					borderColor: "#EF5350",
					orientation: "horizontal",
					text: el.y,
				},
			})),
		]);
	}, []);
	return (
		<div className="bg-white p-4 px-2 my-2 rounded-xl">
			<Chart
				options={{
					...optionsCandle, //

					xaxis: {
						type: "numeric",
						tickAmount: 4,
						...xaxis,
					},
					yaxis: {
						show: false,
						tickAmount: 10,
						forceNiceScale: true,
						min: candleYaxsis.min && candleYaxsis.min - 100,
						max: candleYaxsis.max && candleYaxsis.max + 100,
					},
					annotations: {
						xaxis: annotations,
					},
					chart: {
						...optionsCandle.chart,

						events: {
							zoomed: function (chartContext, { xaxis }) {
								setXaxis(xaxis);
								const min = indicators.macd
									.slice(xaxis.min, xaxis.max)
									.reduce(
										(max: number, obj: any) => Math.min(max, obj.y),
										1000
									);
								const max = indicators.macd
									.slice(xaxis.min, xaxis.max)
									.reduce(
										(max: number, obj: any) => Math.max(max, obj.y),
										-1000
									);
								setYaxis({ min: min - 10, max: max + 10 });
								const minC = data
									.slice(xaxis.min, xaxis.max)
									.reduce(
										(min: number, obj: any) => Math.min(min, obj.y[3]),
										100000
									);
								const maxC = data
									.slice(xaxis.min, xaxis.max)
									.reduce(
										(max: number, obj: any) => Math.max(max, obj.y[2]),
										0
									);
								setCandleYaxsis({ min: minC, max: maxC });
								console.log(minC, maxC);
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
					annotations: {
						xaxis: annotations,
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
