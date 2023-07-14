import { ApexOptions } from "apexcharts";

export const chartOptions: ApexOptions = {
	chart: {
		width: "100%",
		type: "candlestick",
		animations: {
			enabled: false,
		},
	},
	theme: {
		mode: "dark",
		palette: "palette10",
		monochrome: {
			enabled: true,
			color: "#255aee",
			shadeTo: "light",
			shadeIntensity: 0.65,
		},
	},
	xaxis: {
		type: "numeric",
		range: 40,
		tickAmount: 4,
	},
};
