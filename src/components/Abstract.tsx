import { getTextFromClient } from "@/service/server/fetchFtns";

export default function Abstract({ name }: { name: string }) {
	const text = getTextFromClient(name);
	return (
		<div className="flex flex-col text-justify items-center gap-2 p-4 md:px-20 ">
			<h2>Abstract</h2>
			<span>{text}</span>
		</div>
	);
}
