type ApexChartData = { x: number; y: number };
type MACDResult = {
	ma1: ApexChartData[];
	ma2: ApexChartData[];
	macd: ApexChartData[];
	macdSig: ApexChartData[];
	macdOsc: ApexChartData[];
	long: ApexChartData[];
	longSell: ApexChartData[];
	short: ApexChartData[];
	shortSell: ApexChartData[];
	dailyReturn: { id: number; variation: number; dailyProfit: number }[];
};
