import { ApexOptions } from "apexcharts";

export const chartOptions: ApexOptions = {
	chart: {
		width: "100%",
		background: "#fff",
		animations: {
			enabled: false,
		},
		zoom: {
			enabled: true,
			type: "xy",
			autoScaleYaxis: true,
		},
	},
	xaxis: {
		type: "numeric",
		// range: 40,
		tickAmount: 4,
	},
	yaxis: {
		show: false,
		tickAmount: 5,
		// opposite: true,
		// labels: {
		// 	formatter: (value) => {
		// 		return value.toFixed(0);
		// 	},
		// },
	},
	legend: {
		fontSize: "14px",
	},
};
