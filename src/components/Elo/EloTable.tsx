import Link from "next/link";

export default function EloTable({ playersWithElo }: any) {
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
					playersWithElo.slice(0, 20).map((obj: any, idx: number) => (
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
