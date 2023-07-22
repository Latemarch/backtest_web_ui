"use client";

import { createHistogram } from "@/service/client/utils";
import React, { useState } from "react";
// import ReactApexChart from "react-apexcharts";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
	ssr: false,
});

const BarChart = ({ dataArr }: { dataArr: number[] }) => {
	const data = createHistogram(dataArr);
	const categories = Array.from({ length: 21 }, (_, i) => -0.2 + i * 0.02);

	const [chartState, setChartState] = useState({
		series: [
			{
				name: "Average profit a day",
				data,
			},
		],
		options: {
			chart: {
				height: 350,
				type: "bar" as const,
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				curve: "smooth" as const,
			},
			tooltip: {
				x: {
					formatter: function (value: number) {
						const val = value;
						return `${val.toFixed(2)}%~${(val + 0.02).toFixed(2)}%`;
					},
				},
			},

			xaxis: {
				categories,
				tickAmount: 5,
				tickPlacement: "between" as const,
				labels: {
					rotate: 0,
					formatter: (value: string, timestamp?: number) => {
						const val = parseFloat(value);
						return `${val.toFixed(2)}%`;
					},
				},
			},

			fill: {
				opacity: 1,
			},
			plotOptions: {
				bar: {
					columnWidth: "80%",
					distributied: true,
					colors: {
						ranges: [
							{
								from: -1,
								to: 50,
								color: "#26A69A",
							},
						],
					},
				},
			},
		},
	});

	return (
		<div className="p-4">
			<div>Distribution of daily average trade returns</div>
			<ReactApexChart
				options={chartState.options}
				series={chartState.series}
				type="bar"
				height={350}
			/>
		</div>
	);
};

export default BarChart;
