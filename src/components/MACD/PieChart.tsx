"use client";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

type Props = {
	data: { profit: number; loss: number };
};
const PieChart = ({ data: { profit, loss } }: Props) => {
	const [chartState, setChartState] = useState({
		series: [profit, loss],
		options: {
			chart: {
				type: "donut" as const,
			},
			labels: ["Profit", "Loss"],
			colors: ["#26A69A", "#EF5350"],

			responsive: [
				{
					breakpoint: 480,
					options: {
						chart: {
							width: 200,
						},
						legend: {
							position: "bottom" as const,
						},
					},
				},
			],
		},
	});

	return (
		<div className="p-4">
			<p>Ratio of Daily Profits and Losses</p>
			<ReactApexChart
				options={chartState.options}
				series={chartState.series}
				type="donut"
			/>
		</div>
	);
};

export default PieChart;
