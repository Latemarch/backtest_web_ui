import MacdForm from "@/components/Form/MacdForm";
import { getLocalCandles } from "@/service/client/fetchFtns";

export default async function page() {
	const result = await getLocalCandles(0, 2);

	console.log(result[0].length);
	return (
		<div>
			<MacdForm />
		</div>
	);
}
