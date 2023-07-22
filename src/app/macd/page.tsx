import Abstract from "@/components/Abstract";
import EloTable from "@/components/Elo/EloTable";

export default async function page() {
	return (
		<div className="flex flex-col w-full">
			<div className="flex flex-col w-full">
				<Abstract name="abstractMACD" />
				{/* <MacdForm candles={candles} /> */}
			</div>
			<div className="p-4">
				<EloTable />
			</div>
		</div>
	);
}
