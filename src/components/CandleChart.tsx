"use client";
import useCandleData from "@/hooks/useCandleData";
import { chartOptions } from "@/service/server/options";
import Chart from "react-apexcharts";

export default function CandleChart() {
	const options = chartOptions;
	const {
		candleQuery: { data },
	} = useCandleData({});
	console.log(data);
	return (
		<div className="bg-DarkChart p-4 px-2 my-2 rounded-xl">
			{/* <Chart
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
			/> */}
		</div>
	);
}
