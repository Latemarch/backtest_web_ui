import FramerWrapper from "./FramerWrapper";
import TradeHistory from "@/components/TradeHistory";
import ChartContainer from "@/components/ChartContainer";

export async function generateMetadata() {
	return {
		title: "show me the money",
		description: "Web ui for back test and system trading",
	};
}
export default function Home() {
	return (
		<FramerWrapper>
			<ChartContainer />
		</FramerWrapper>
	);
}
