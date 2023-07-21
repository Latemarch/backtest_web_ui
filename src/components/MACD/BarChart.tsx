"use client";
import { createHistogram } from "@/service/client/utils";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const BarChart = ({ dataArr }: { dataArr: number[] }) => {
	const data = createHistogram(dataArr);
	const categories = Array.from({ length: 51 }, (_, i) => -5 + i * 0.2);

	const [chartState, setChartState] = useState({
		series: [
			{
				name: "daily return",
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

			xaxis: {
				categories,
				tickAmount: 10,
				tickPlacement: "between" as const,
				labels: {
					rotate: 0,
					formatter: (value: string, timestamp?: number) => {
						const val = parseFloat(value);
						return `${val.toFixed(1)}%`;
					},
				},
			},

			fill: {
				opacity: 1,
			},
			plotOptions: {
				bar: {
					columnWidth: "80%",
				},
			},
		},
	});

	return (
		<div id="chart">
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
