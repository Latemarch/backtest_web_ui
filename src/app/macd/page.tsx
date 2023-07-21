import { getLocalCandles } from "@/service/server/fetchFtns";
import { combineCandles } from "@/service/client/utils";
import Abstract from "@/components/Abstract";
import EloContainer from "@/components/Elo/EloContainer";
import EloTable from "@/components/Elo/EloTable";

export default async function page() {
	const result = await getLocalCandles(0, 61);
	const candles = combineCandles(result);

	return (
		<div className="flex flex-col w-full">
			<div className="flex flex-col w-full">
				<Abstract />
				{/* <MacdForm candles={candles} /> */}
			</div>
			<EloContainer asset="btcusd" strategy="macd" />
		</div>
	);
}
