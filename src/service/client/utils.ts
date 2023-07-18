export function combineCandles(
	candleArr: historyKlineData[]
): historyKlineData {
	return candleArr.reduce(
		(acc: historyKlineData, cur: historyKlineData) => [...acc, ...cur],
		[]
	);
}

export function mapCandleData(candles: historyKlineData) {
	return candles.map((candle, idx) => ({
		x: idx,
		y: [
			...candle
				.slice(1, 5) //
				.map((num) => Number(num)),
		],
	}));
}
