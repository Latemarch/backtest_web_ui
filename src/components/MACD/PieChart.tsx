"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
	ssr: false,
});

type Props = {
	title: string;
	data: { profit: number; loss: number };
};

const PieChart = ({ title, data: { profit, loss } }: Props) => {
	const [chartState, setChartState] = useState({
		series: [profit, loss],
		options: {
			chart: {
				type: "donut" as const,
			},
			title: {
				text: title,
				align: "left" as const,
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
			<ReactApexChart
				options={chartState.options}
				series={chartState.series}
				type="donut"
			/>
		</div>
	);
};

export default PieChart;
