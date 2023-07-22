import BarChart from "@/components/MACD/BarChart";
import ConstantTable from "@/components/MACD/ConstantTable";
import PieChart from "@/components/MACD/PieChart";
import ProfitDetail from "@/components/MACD/ProfitDetail";
import client from "@/service/client/client";

export const revalidate = 60 * 60 * 24;

export async function generateStaticParams() {
	const res = await client.bTResult.findMany();
	const BTResults = res;

	return BTResults.map((result: any) => ({
		id: result.id.toString(),
	}));
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
			<BarChart dataArr={data.profitAverage as number[]} />
			<div className="flex text-justify flex-col sm:flex-row">
				<span className="p-4 w-1/2">
					Daily Profit Status. The days of profit and loss are represented as
					percentages.
				</span>
				<div className="w-1/2">
					<PieChart
						data={{
							profit,
							loss,
						}}
					/>
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
