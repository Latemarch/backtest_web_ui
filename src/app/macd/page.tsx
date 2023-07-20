import MacdForm from "@/components/Form/MacdForm";
import { getLocalCandles } from "@/service/server/fetchFtns";
import { combineCandles } from "@/service/client/utils";
import Abstract from "@/components/Abstract";
import EloChartContainer from "@/components/Elo/EloChartContainer";

export default async function page() {
	const result = await getLocalCandles(0, 61);
	const candles = combineCandles(result);

	return (
		<div className="flex flex-col w-full">
			<div className="flex">
				<Abstract />
				<MacdForm candles={candles} />
			</div>
			<EloChartContainer asset="btcusd" strategy="macd" />
		</div>
	);
}
