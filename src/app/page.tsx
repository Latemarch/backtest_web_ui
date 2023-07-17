import FramerWrapper from "./FramerWrapper";
import TradeHistory from "@/components/TradeHistory";
import ResultChartContainer from "@/components/ResultChartContainer";

export default function Home() {
	return (
		<FramerWrapper>
			main
			{/* <PriceTracker /> */}
			<ResultChartContainer />
			<TradeHistory />
		</FramerWrapper>
	);
}
