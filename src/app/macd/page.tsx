import MacdForm from "@/components/Form/MacdForm";
import { getLocalCandles } from "@/service/server/fetchFtns";
import { combineCandles } from "@/service/client/utils";

export default async function page() {
	const result = await getLocalCandles(0, 6);
	const candles = combineCandles(result);
	console.log(candles.length);

	return (
		<div className="flex w-full">
			<div className="flex flex-col w-1/2 text-justify items-center gap-2 p-2">
				<h2>Abstract</h2>
				<span>
					The MACD (Moving Average Convergence Divergence) is an investment
					strategy that uses the convergence and divergence of the long-term
					moving average line and the short-term moving average line to predict
					the rise or fall of the market.
					<br /> In most cases, when the MACD value transitions from negative to
					positive, a 'golden cross' occurs, suggesting the start of an upward
					trend.
					<br /> This investment strategy operates on the assumption that the
					MACD value has periodicity. When an upward trend begins from a
					negative MACD value, this is taken as a signal to buy, and once the
					upward trend has progressed to some extent (as defined by the MACD
					count), profits are realized.
					<br /> For all position entries, profit cut points and loss cut points
					are set. The values of the two moving averages (MA1, MA2) for basic
					MACD settings are set at 12 and 26, respectively. The signal line
					(MACD length) of the MACD is set at 9.
				</span>
			</div>
			<MacdForm candles={candles} />
		</div>
	);
}
