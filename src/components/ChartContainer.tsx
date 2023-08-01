import { mapCandleData } from "@/service/client/utils";
import { backTestBot } from "@/service/client/strategy";
import CandleChart from "./CandleChart";
import { getLocalCandle } from "@/service/server/fetchFtns";

export default async function ChartContainer() {
	// const {
	// 	candleQuery: { data: candleArr },
	// } = useCandleData({ lte: 1, id: 1 });
	// if (!candleArr) return;
	// const candles = combineCandles(candleArr);
	const candles = await getLocalCandle("001");

	const indicators = backTestBot({
		candles,
		ma1: 12,
		ma2: 26,
		macd: 4,
		profitCount: 9,
		profitCut: 1,
		lossCut: -0.8,
	});

	const data = mapCandleData(candles);
	return (
		<div className="bg-white p-4 w-full h-auto min-h-[700px] rounded-lg">
			<CandleChart data={data} indicators={indicators} />
		</div>
	);
}
