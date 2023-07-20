import { getBTResult } from "@/service/client/fetchFtns";
import { useQuery } from "@tanstack/react-query";

export type BTparams = {
	asset?: string;
	strategy?: string;
	constants?: string;
};
type Props = {
	BTParams: BTparams;
};
export default function useBTResult({ BTParams }: Props) {
	const resultQuery = useQuery(
		["BT", BTParams.asset, BTParams.constants, BTParams.strategy],
		() => getBTResult(BTParams)
	);

	return { resultQuery };
}
