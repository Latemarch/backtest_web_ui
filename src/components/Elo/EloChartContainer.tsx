"use client";
import useBTResult, { BTparams } from "@/hooks/useBTResult";
import { Player, calculateElo } from "@/service/client/utils";
import { useState } from "react";
import EloTable from "./EloTable";

export default function EloChartContainer({
	asset,
	strategy,
	constants,
}: BTparams) {
	const {
		resultQuery: { data: res },
	} = useBTResult({
		BTParams: { asset, strategy, constants },
	});
	const BTResult = res?.data;
	const [playersWithElo, setPlayersWithElo] = useState<any[] | null>(null);

	const handleClick = async () => {
		const players: Player[] = BTResult.map((obj: any) => ({
			id: obj.id,
			score: obj.fluctuation.map(
				(f: number, i: number) => obj.dailyReturn[i] / f
			),
			elo: 1000,
		}));
		const result = calculateElo(players);
		console.log(result);
		console.log(BTResult[0]);
		setPlayersWithElo(
			result
				.sort((a, b) => b.elo - a.elo)
				.map((obj: any) => ({
					...obj,
					...BTResult.find((bt: any) => bt.id === obj.id),
				}))
		);
		console.log("withElo", playersWithElo);
	};
	return (
		<div>
			EloChartContainer
			<button
				className="p-1 border rounded-md border-gray-300 w-full"
				onClick={handleClick}
			>
				click
			</button>
			{playersWithElo && <EloTable playersWithElo={playersWithElo} />}
		</div>
	);
}
