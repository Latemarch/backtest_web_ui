import BarChart from "@/components/MACD/BarChart";
import ConstantTable from "@/components/MACD/ConstantTable";
import PieChart from "@/components/MACD/PieChart";
import ProfitDetail from "@/components/MACD/ProfitDetail";
import client from "@/service/client/client";
import { getEloRankFromClient } from "@/service/server/fetchFtns";

export const revalidate = 60 * 60 * 24;

export async function generateStaticParams() {
	return await getEloRankFromClient({ asset: "btcusd", strategy: "MACD" });
}

export async function generateMetadata({
	params: { id },
}: {
	params: { id: string };
}) {
	return {
		title: `MACD strategy ${id}`,
		description: `MACD strategy description`,
	};
}

export default async function Page({
	params: { id },
}: {
	params: { id: string };
}) {
	const data = (await client.bTResult.findUnique({
		where: {
			id: Number(id),
		},
	})) as Data;
	if (!data) return <div>no data</div>;
	const constants = data.constants.split(",").map(Number);
	const profit = data.dailyReturn.filter((d) => d > 0).length;
	const loss = data.dailyReturn.length - profit;
	return (
		<div>
			<ConstantTable constants={constants} />
			<ProfitDetail />
			<div className="text-justify sm:columns-2">
				<div className="flex text-justify flex-col ">
					<h2 className="text-bold text-center">1. Daily return</h2>
					<span className="p-4 ">
						In MACD trading, we conducted a 60-day backtest using the mentioned
						constants and minute candles. The following chart represents the
						average daily trading return.
					</span>
					<div className="">
						<BarChart dataArr={data.profitAverage as number[]} />
					</div>
				</div>
				<div className="flex text-justify flex-col ">
					<h2 className="text-bold text-center">2. Winning percentage</h2>
					<span className="p-4 ">
						Daily Profit Status. The days of profit and loss are represented as
						percentages.
					</span>
					<div className="">
						<PieChart
							data={{
								profit,
								loss,
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

type Data = {
	id: number;
	asset: string;
	strategy: string;
	constants: string;
	dailyReturn: number[];
	profitAverage: number[];
	fluctuation: number[];
	createdAt: Date;
	updateAt: Date;
};
