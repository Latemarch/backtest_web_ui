import BarChart from "@/components/MACD/BarChart";
import ConstantTable from "@/components/MACD/ConstantTable";
import ProfitDetail from "@/components/MACD/ProfitDetail";

const domain = process.env.NEXT_PUBLIC_API_URL;
// export async function generateStaticParams() {
// 	const BTResults = await fetch(`${domain}/api/results`)
// 		.then((res) => res.json())
// 		.then((json) => {
// 			return json.data;
// 		});
// 	return BTResults.map((result: any) => ({
// 		id: result.id.toString(),
// 	}));
// }

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
	const data = await fetch(`${domain}/api/results/${id}`)
		.then((res) => res.json())
		.then((json) => json.data);

	const constants = data.constants.split(",").map(Number);
	console.log(data);
	return (
		<div>
			<ConstantTable constants={constants} />
			<ProfitDetail />
			<BarChart dataArr={data.dailyReturn} />
		</div>
	);
}
