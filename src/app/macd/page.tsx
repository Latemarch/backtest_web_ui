import EloTable from "@/components/Elo/EloTable";
import AbstractMACD from "@/components/MACD/AbstractMACD";

export default async function page() {
	return (
		<div className="flex flex-col w-full">
			<div className="flex flex-col w-full">
				<AbstractMACD />
				{/* <MacdForm candles={candles} /> */}
			</div>
			<div className="p-4">
				<EloTable />
			</div>
		</div>
	);
}
