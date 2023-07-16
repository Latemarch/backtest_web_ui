import { ApexOptions } from "apexcharts";

export const chartOptions: ApexOptions = {
	chart: {
		width: "100%",
		background: "#fff",
		type: "candlestick",
		id: "candles",
		animations: {
			enabled: false,
		},
		zoom: {
			enabled: true,
			type: "xy",
		},
		// brush: {
		// 	enabled: true,
		// 	target: "macd",
		// },
	},
	xaxis: {
		type: "numeric",
		tickAmount: 4,
	},
	stroke: {
		curve: "smooth",
		width: 2,
	},
	yaxis: {
		show: false,
		tickAmount: 5,
	},

	legend: {
		floating: true,
		position: "top",
		horizontalAlign: "left",
	},
};

export const chartBar: ApexOptions = {
	chart: {
		width: "100%",
		id: "macd",
		type: "bar",
		height: 100,
		background: "#fff",
		animations: {
			enabled: false,
		},
		zoom: {
			enabled: false,
			autoScaleYaxis: true,
		},
	},
	xaxis: {
		type: "numeric",
		tickAmount: 1,
	},
	yaxis: {
		show: false,
		tickAmount: 4,
	},
	stroke: {
		curve: "smooth",
		width: 2,
	},
	legend: {
		floating: true,
		position: "top",
		horizontalAlign: "left",
	},
};
