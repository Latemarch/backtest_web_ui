import { MACDResult } from "@/types/backTest";
import {
	convertToUploadResult,
	getAverage,
	getFluctuation,
	ma,
	macdSig,
	tradeWithMacd,
} from "./backTestUtils";

type Props = {
	candles: historyKlineData;
	ma1: number;
	ma2: number;
	macd: number;
	profitCount: number;
	profitCut: number;
	lossCut: number;
};

export function backTestBot({
	candles,
	ma1,
	ma2,
	macd,
	profitCount,
	profitCut,
	lossCut,
}: Props) {
	lossCut = lossCut / 100;
	profitCut = profitCut / 100;
	const result: MACDResult = {
		ma1: [],
		ma2: [],
		macd: [],
		macdSig: [],
		macdOsc: [],
		long: [],
		longSell: [],
		short: [],
		shortSell: [],
		dailyResult: [],
	};
	const wallet = {
		long: false,
		short: false,
		longPosition: false,
		shortPosition: false,
	};
	let count = 0;
	let openPrice = candles[0][4];
	let dailyProfit = 0;
	let profits = [];
	for (let i = ma2, k = 0; i < candles.length; i++, k++) {
		//Save daily return
		if ((i + 1) % 1439 === 0) {
			const id = Math.floor(i / 1439);
			const dailyReturn = {
				id,
				variation: (openPrice - candles[i][4]) / candles[i][4],
				dailyProfit,
				dailyProfitAverage: getAverage(profits),
				dailyFluctuation: getFluctuation(profits),
			};
			result.dailyResult.push(dailyReturn);
			openPrice = candles[i][4];
			dailyProfit = 0;
			profits = [];
		}

		//indicators
		const x = i;
		result.ma1.push({ x, y: ma(candles, i, ma1) });
		result.ma2.push({ x, y: ma(candles, i, ma2) });
		result.macd.push({
			x,
			y: result.ma1[k].y - result.ma2[k].y,
		});

		if (k < ma2) continue;
		result.macdSig.push({ x, y: macdSig(result.macd, k, macd) });
		result.macdOsc.push({
			x,
			y:
				result.macd[result.macd.length - 1].y -
				result.macdSig[result.macdSig.length - 1].y,
		});
		//indicators

		//trade
		if (k < Number(ma2) + 10) continue;
		wallet.long = tradeWithMacd(result.macd);
		if (wallet.longPosition) {
			let entryPrice = result.long[result.long.length - 1].y;
			let price = candles[i][4];
			let profit = 1 - entryPrice / price;
			let cummition = 0.002;

			//Sell position
			if (profit > profitCut || profit < lossCut || count > profitCount) {
				if (profit > profitCut) profit = profitCut;
				else if (profit < lossCut) cummition = 0.005;
				else if (count > profitCount) profit -= 0.0005;

				result.longSell.push({ x, y: candles[i][2] + 100 });
				wallet.longPosition = false;

				count = 0;
				dailyProfit += profit - cummition;
				profits.push(profit - cummition);
			}

			//Check MACD
			if (
				result.macd[result.macd.length - 1].y >
				result.macd[result.macd.length - 2].y
			) {
				count = count + 1;
			}

			//Set Position
		} else if (wallet.long) {
			result.long.push({ x, y: candles[i][3] - 100 });
			wallet.longPosition = true;
		}
	}

	const uploadResult = convertToUploadResult(result.dailyResult);
	result.uploadResult = uploadResult;
	return result;
}
