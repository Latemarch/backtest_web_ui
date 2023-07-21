import BarChart from "@/components/MACD/BarChart";
import ConstantTable from "@/components/MACD/ConstantTable";
import ProfitDetail from "@/components/MACD/ProfitDetail";
import client from "@/service/client/client";

const domain = process.env.NEXT_PUBLIC_API_URL;
export async function generateStaticParams() {
	// const BTResults = await fetch(`${domain}/api/results`)
	// 	.then((res) => res.json())
	// 	.then((json) => {
	// 		return json.data;
	// 	});
	const res = await client.bTResult.findMany();
	const BTResults = res;
	console.log(res.length);

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
	const data = await client.bTResult.findUnique({
		where: {
			id: Number(id),
		},
	});
	if (!data) return <div>no data</div>;
	const constants = data.constants.split(",").map(Number);
	console.log(constants);
	return (
		<div>
			<ConstantTable constants={constants} />
			<ProfitDetail />
			{/* <BarChart dataArr={data.dailyReturn} /> */}
		</div>
	);
}
