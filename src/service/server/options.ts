import { ApexOptions } from "apexcharts";

export const chartOptions: ApexOptions = {
	chart: {
		width: "100%",
		type: "candlestick",
		background: "#fff",
		animations: {
			enabled: false,
		},
	},
	xaxis: {
		type: "numeric",
		// range: 40,
		tickAmount: 4,
	},
	yaxis: {
		opposite: true,
	},
	legend: {
		fontSize: "14px",
	},
};
