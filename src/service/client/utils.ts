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

export type Player = { id: number; score: number[]; elo: number };
export function calculateElo(players: Player[]): Player[] {
	const K = 32;
	const numPlayers = players.length;
	const numSituations = players[0].score.length;

	// 각 상황에 대해 Elo 점수 계산
	for (let i = 0; i < numSituations; i++) {
		// 각 플레이어에 대해
		for (let j = 0; j < numPlayers; j++) {
			// 다른 모든 플레이어와 비교
			for (let k = j + 1; k < numPlayers; k++) {
				// Elo 계산
				const expectedScore =
					1 / (1 + Math.pow(10, (players[k].elo - players[j].elo) / 400));
				const actualScore = players[j].score[i] > players[k].score[i] ? 1 : 0;
				const score = K * (actualScore - expectedScore);
				players[j].elo += score;
				players[k].elo -= score;
			}
		}
	}

	return players;
}

export function createHistogram(inputArr: number[]): number[] {
	// 입력 배열의 모든 원소에 100을 곱함
	const scaledInput = inputArr.map((val) => val * 100);

	// -4부터 4까지 0.1 단위로 배열 생성
	const bins = Array.from({ length: 51 }, (_, i) => -5 + i * 0.2);

	// 각 구간에 해당하는 값을 필터링하여 카운트한 배열 생성
	const histogram = bins.map((bin, idx) => {
		if (idx === bins.length - 1) {
			// 마지막 bin의 경우 bin 값보다 큰 값들만 포함
			return scaledInput.filter((val) => val >= bin).length;
		} else {
			const nextBin = bins[idx + 1];
			return scaledInput.filter((val) => val >= bin && val < nextBin).length;
		}
	});

	return histogram;
}
