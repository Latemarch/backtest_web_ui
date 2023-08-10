"use client";
import { useForm } from "react-hook-form";
import InputConstant from "./InputConstant";
import { backTestBot } from "@/service/client/strategies/strategyMACD";
import { getBTResult, postResult } from "@/service/client/fetchFtns";

type SubmitData = {
	ma1: number;
	ma2: number;
	macd: number;
	profitCount: number;
	profitCut: number;
	lossCut: number;
};
export default function MacdForm({ candles }: { candles: historyKlineData }) {
	const { register, handleSubmit } = useForm();

	const onSubmit = async (data: any) => {
		const constants = stringfyWithComma(data);
		const res = await getBTResult({
			asset: "btcusd",
			strategy: "macd",
			constants,
		});

		if (res.ok) {
			console.log("already exist on server", constants);
			console.log(res);
			return res;
		}
		const result = backTestBot({ ...data, candles });

		if (!result.uploadResult) return;
		const postRes = await postResult({
			asset: "btcusd",
			strategy: "macd",
			constants,
			result: result.uploadResult,
		});
		console.log("postRes", postRes);
	};

	return (
		<form className="flex flex-col w-1/2" onSubmit={handleSubmit(onSubmit)}>
			<InputConstant
				name="Moving Average 1"
				placeholder="12"
				register={register("ma1")}
			/>
			<InputConstant
				name="Moving Average 2"
				placeholder="26"
				register={register("ma2")}
			/>
			<InputConstant
				name="Length of MACD signal"
				placeholder="9"
				register={register("macd")}
			/>
			<InputConstant
				name="MACD signal bar count for profit cut"
				placeholder="9"
				register={register("profitCount")}
			/>
			<InputConstant
				name="Profit cut (%)"
				placeholder="1"
				register={register("profitCut")}
			/>

			<InputConstant
				name="Loss cut (%)"
				placeholder="0.8"
				register={register("lossCut")}
			/>
			<button type="submit">Submitt</button>
		</form>
	);
}

function stringfyWithComma(data: any): string {
	return Object.values(data as SubmitData)
		.reduce((acc, cur) => {
			return acc + cur + ",";
		}, "")
		.slice(0, -1);
}
