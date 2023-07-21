export default function Abstract() {
	return (
		<div className="flex flex-col text-justify items-center gap-2 p-4 md:px-20 ">
			<h2>Abstract</h2>
			<span>
				The MACD (Moving Average Convergence Divergence) is an investment
				strategy that uses the convergence and divergence of the long-term
				moving average line and the short-term moving average line to predict
				the rise or fall of the market. In most cases, when the MACD value
				transitions from negative to positive, a golden cross occurs, suggesting
				the start of an upward trend. This investment strategy operates on the
				assumption that the MACD value has periodicity. When an upward trend
				begins from a negative MACD value, this is taken as a signal to buy, and
				once the upward trend has progressed to some extent (as defined by the
				MACD count), profits are realized. For all position entries, profit cut
				points and loss cut points are set. The values of the two moving
				averages (MA1, MA2) for basic MACD settings are set at 12 and 26,
				respectively. The signal line (MACD length) of the MACD is set at 9.
			</span>
		</div>
	);
}
