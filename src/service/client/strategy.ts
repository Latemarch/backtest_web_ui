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
		dailyReturn: [],
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
	for (let i = ma2, k = 0; i < candles.length; i++, k++) {
		//indicators
		if (i % 1440 === 0) {
			const dailyReturn = {
				id: Math.floor(i / 1440),
				variation: (openPrice - candles[i][4]) / candles[i][4],
				dailyProfit,
			};
			result.dailyReturn.push(dailyReturn);
			console.log(dailyReturn);
			openPrice = candles[i][4];
			dailyProfit = 0;
		}
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
		if (k < ma2 + 10) continue;
		wallet.long = tradeWithMacd(result.macd);
		if (wallet.longPosition) {
			let entryPrice = result.long[result.long.length - 1].y;
			let price = candles[i][4];
			let profit = 1 - entryPrice / price;
			if (profit > profitCut || profit < lossCut || count > profitCount) {
				result.longSell.push({ x, y: candles[i][2] + 100 });
				wallet.longPosition = false;
				count = 0;
			}
			if (
				result.macd[result.macd.length - 1].y >
				result.macd[result.macd.length - 2].y
			) {
				count = count + 1;
			}
		} else if (wallet.long) {
			result.long.push({ x, y: candles[i][3] - 100 });
			wallet.longPosition = true;
		}
	}
	return result;
}

function tradeWithMacd(macd: { [key: string]: number }[]) {
	const arr = macd.slice(-3).map((obj) => obj.y);
	// if (arr[2] > 0 && arr[0] > arr[1] && arr[1] > arr[2]) return -1;
	if (arr[2] < 0 && arr[0] < arr[1] && arr[1] < arr[2]) return true;
	return false;
}

function ma(candles: historyKlineData, i: number, period: number) {
	let sum = 0;
	for (let j = 0; j < period; j++) {
		sum += candles[i - j][4];
	}
	return Number((sum / period).toFixed(2));
}
function macd(ma1: number, ma2: number) {
	return ma1 - ma2;
}

function macdSig(macd: any, i: number, period: number) {
	let sum = 0;
	for (let j = 0; j < period; j++) {
		sum += macd[i - j].y;
	}
	return Number((sum / period).toFixed(2));
}
