type Props = {
	candles: historyKlineData;
	ma1: number;
	ma2: number;
};

export function backTestBot({ candles, ma1, ma2 }: Props) {
	const indicators: Indicators = {
		ma1: [],
		ma2: [],
		macd: [],
		macdSig: [],
		macdOsc: [],
	};
	for (let i = ma2, k = 0; i < candles.length; i++, k++) {
		const x = i;
		indicators.ma1.push({ x, y: ma(candles, i, ma1) });
		indicators.ma2.push({ x, y: ma(candles, i, ma2) });
		indicators.macd.push({
			x,
			y: macd(indicators.ma1[k].y, indicators.ma2[k].y),
		});
	}
	return indicators;
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
