import FramerWrapper from "./FramerWrapper";
import PriceTracker from "../components/PriceTracker";
import CandleChart from "@/components/CandleChart";

export default function Home() {
	return (
		<FramerWrapper>
			main
			{/* <PriceTracker /> */}
			<CandleChart />
		</FramerWrapper>
	);
}
