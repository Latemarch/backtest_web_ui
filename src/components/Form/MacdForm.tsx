"use client";
import { useForm } from "react-hook-form";
import InputConstant from "./InputConstant";

export default function MacdForm() {
	const { register, handleSubmit } = useForm();

	const onSubmit = (data: { [key: string]: string }) => {
		console.log(data);
		const constants = Object.values(data)
			.reduce((acc: string, cur: string) => {
				return acc + cur + ",";
			}, "")
			.slice(0, -1);
		console.log(constants);
		// const indicator = backTestBot(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<InputConstant
				type="number"
				placeholder="Length of MA1"
				register={register("ma1")}
			/>
			<InputConstant
				type="number"
				placeholder="Length of MA2"
				register={register("ma2")}
			/>
			<InputConstant
				type="number"
				placeholder="Length of MACD"
				register={register("macd")}
			/>
			<InputConstant
				type="number"
				placeholder="MACD count for profit cut "
				register={register("profitCount")}
			/>
			<InputConstant
				type="number"
				placeholder="Profit cut"
				register={register("profitCut")}
			/>
			<InputConstant
				type="number"
				placeholder="Loss cut"
				register={register("lossCut")}
			/>
			<button type="submit">Submitt</button>
		</form>
	);
}
