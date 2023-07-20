import { UploadDailyResult } from "@/app/api/results/route";

type ApexChartData = { x: number; y: number };
export type DailyResult = {
	id: number;
	variation: number;
	dailyProfit: number;
	dailyProfitAverage: number;
	dailyFluctuation: number;
};
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
	dailyResult: DailyResult[];
	uploadResult?: UploadDailyResult;
};
