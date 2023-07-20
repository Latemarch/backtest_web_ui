import { UploadDailyResult } from "@/app/api/results/route";
import { DailyResult } from "@/types/backTest";

export function tradeWithMacd(macd: { [key: string]: number }[]) {
	const arr = macd.slice(-3).map((obj) => obj.y);
	// if (arr[2] > 0 && arr[0] > arr[1] && arr[1] > arr[2]) return -1;
	if (arr[2] < 0 && arr[0] < arr[1] && arr[1] < arr[2]) return true;
	return false;
}

export function ma(candles: historyKlineData, i: number, period: number) {
	let sum = 0;
	for (let j = 0; j < period; j++) {
		sum += candles[i - j][4];
	}
	return Number((sum / period).toFixed(2));
}
function macd(ma1: number, ma2: number) {
	return ma1 - ma2;
}

export function macdSig(macd: any, i: number, period: number) {
	let sum = 0;
	for (let j = 0; j < period; j++) {
		sum += macd[i - j].y;
	}
	return Number((sum / period).toFixed(2));
}

export function getFluctuation(arr: number[]) {
	let avg = arr.reduce((sum, value) => sum + value, 0) / arr.length;

	let squaredDifferences = arr.map((value) => Math.pow(value - avg, 2));
	let avgSquaredDifference =
		squaredDifferences.reduce((sum, value) => sum + value, 0) / arr.length;

	return Math.sqrt(avgSquaredDifference);
}

export function getAverage(arr: number[]) {
	return arr.reduce((sum, value) => sum + value, 0) / arr.length;
}

export function convertToUploadResult(arr: DailyResult[]): UploadDailyResult {
	const fluctuation = arr.map((obj) => obj.dailyFluctuation);
	const profitAverage = arr.map((obj) => obj.dailyProfitAverage);
	const dailyReturn = arr.map((obj) => obj.dailyProfit);
	return { fluctuation, profitAverage, dailyReturn };
}
