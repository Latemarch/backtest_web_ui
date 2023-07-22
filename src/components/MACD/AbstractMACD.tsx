export default function AbstractMACD({ arr }: { arr: any[] }) {
	return (
		<div className="flex flex-col text-justify items-center gap-2 p-4 md:px-20 mb-10">
			<h2>Abstract</h2>
			<span>{`This page presents the results of automated trading using the Moving Average Convergence Divergence (MACD) indicator. The trading settings were configured as follows: the first moving average (MA1) was set at ${arr[0]}, the second moving average (MA2) at ${arr[1]}, the MACD length was ${arr[2]}, the profit realization count was set to ${arr[3]} minutes, the profit cut-off was ${arr[4]}%, and the loss cut-off was ${arr[5]}%
`}</span>
		</div>
	);
}
