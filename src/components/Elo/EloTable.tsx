export default function EloTable({ playersWithElo }: any) {
	return (
		<div>
			{playersWithElo &&
				playersWithElo.map((obj: any, idx: number) => (
					<div className="flex justify-between" key={obj.id}>
						<p>{idx + 1}</p>
						<p>{obj.id}</p>
						<p>{obj.elo.toFixed(0)}</p>
						<p>{obj.constants}</p>
						<p>
							{(
								obj.dailyReturn.reduce(
									(acc: number, cur: number) => acc + cur,
									0
								) * 100
							).toFixed(2)}
							%
						</p>
						{(
							obj.fluctuation.reduce(
								(acc: number, cur: number) => acc + cur,
								0
							) / obj.fluctuation.length
						).toFixed(5)}
					</div>
				))}
		</div>
	);
}
