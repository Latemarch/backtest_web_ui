import client from "@/service/client/client";
import { Player, calculateElo } from "@/service/client/utils";
import { updateEloRankToClient } from "@/service/server/fetchFtns";
import Link from "next/link";

export const revalidate = 60 * 60 * 24;
export default async function EloTable() {
	const BTResult = await client.bTResult.findMany({
		select: {
			id: true,
			fluctuation: true,
			dailyReturn: true,
		},
	});
	const players: Player[] = BTResult.map((obj: any) => ({
		id: obj.id,
		score: obj.fluctuation.map(
			(f: number, i: number) => obj.dailyReturn[i] / f
		),
		elo: 1000,
	}));
	const result = calculateElo(players);
	const playersWithElo = result
		.sort((a, b) => b.elo - a.elo)
		.slice(0, 20)
		.map((obj: any) => ({
			...obj,
			...BTResult.find((bt: any) => bt.id === obj.id),
		}));
	updateEloRankToClient({
		data: playersWithElo.map((el) => el.id),
		asset: "btcusd",
		strategy: "MACD",
	});
	return (
		<table className="table-auto w-full border border-zinc-400 drop-shadow-sm">
			<thead className="border-b-2 border-zinc-400 text-start">
				<tr className="h-16">
					<th></th>
					<th>Rank</th>
					<th>ID</th>
					<th>ELO</th>
					<th>Daily Return</th>
					<th>Net Profit</th>
				</tr>
			</thead>
			<tbody>
				{playersWithElo &&
					playersWithElo.map((obj: any, idx: number) => (
						<tr
							key={obj.id}
							className="border-b border-zinc-400 h-12 text-center cursor-pointer hover:bg-zinc-100"
						>
							<Link className="w-full h-12 fixed" href={`/macd/${obj.id}`} />
							<td>{idx + 1}</td>
							<td>{obj.id}</td>
							<td>{obj.elo.toFixed(0)}</td>
							<td>
								{(
									(obj.dailyReturn.reduce(
										(acc: number, cur: number) => acc + cur,
										0
									) *
										100) /
									obj.dailyReturn.length
								).toFixed(2)}
								%
							</td>
							<td>
								{(
									obj.dailyReturn.reduce(
										(acc: number, cur: number) => acc + cur,
										0
									) * 100
								).toFixed(2)}
								%
							</td>
						</tr>
					))}
			</tbody>
		</table>
	);
}
