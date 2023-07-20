import { BTResult } from "@prisma/client";

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
