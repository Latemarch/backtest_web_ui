const key = ["MA1", "MA2", "MACD", "Count", "ProfitCut", "LossCut"];
export default function ConstantTable({ constants }: { constants: number[] }) {
	return (
		<ul className="p-1 m-4 flex flex-wrap gap-4 justify-center text-center border-y border-zinc-400">
			{key.map((k: string, i: number) => (
				<li className="justify-between" key={k}>
					<p>{k}</p>
					<p>{constants[i]}</p>
				</li>
			))}
		</ul>
	);
}
