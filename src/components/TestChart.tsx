"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

function TestChart({ data, indicators }: any) {
	const [chartOptions, setChartOptions] = useState({
		series: [
			{
				data,
			},
		],
		options: {
			chart: {
				type: "candlestick",
				height: 290,
				id: "candles",
				toolbar: {
					autoSelected: "pan",
					show: false,
				},
			},
			plotOptions: {
				candlestick: {
					colors: {
						upward: "#3C90EB",
						downward: "#DF7D46",
					},
				},
			},
			xaxis: {
				type: "numeric",
			},
		},
		seriesBar: [
			{
				name: "volume",
				data: indicators.macd,
			},
		],
		optionsBar: {
			chart: {
				height: 160,
				type: "bar",
				brush: {
					enabled: true,
					autoZoomY: true,
					target: "candles",
				},
				events: {
					updated: function (context, xaxis) {
						console.log("context", context);
						console.log("xaxis", xaxis);
					},
				},

				selection: {
					enabled: true,
					xaxis: {
						min: 0,
						max: 200,
					},
					fill: {
						color: "#ccc",
						opacity: 0.4,
					},
					stroke: {
						color: "#0D47A1",
					},
				},
			},
			dataLabels: {
				enabled: false,
			},
			plotOptions: {
				bar: {
					columnWidth: "80%",
					colors: {
						ranges: [
							{
								from: -1000,
								to: 0,
								color: "#F15B46",
							},
							{
								from: 1,
								to: 10000,
								color: "#FEB019",
							},
						],
					},
				},
			},
			stroke: {
				width: 0,
			},
			xaxis: {
				type: "numeric",
				axisBorder: {
					offsetX: 13,
				},
			},
			yaxis: {
				labels: {
					show: false,
				},
			},
		},
	});

	return (
		<div className="chart-box">
			<div id="chart-candlestick">
				<Chart
					options={chartOptions.options}
					series={chartOptions.series}
					type="candlestick"
					height={290}
				/>
			</div>
			<div id="chart-bar">
				<Chart
					options={chartOptions.optionsBar}
					series={chartOptions.seriesBar}
					type="bar"
					height={160}
				/>
			</div>
		</div>
	);
}

export default TestChart;
