"use client";
import { backTestBot } from "@/service/client/strategy";
import { useForm } from "react-hook-form";

export default function MacdInput() {
	const { register, handleSubmit } = useForm();

	const onSubmit = (data: any) => {
		console.log(data);
		const indicator = backTestBot(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input type="number" {...register("ma1")} placeholder="ma1" />
			<input type="number" {...register("ma2")} placeholder="ma2" />
			<input type="number" {...register("macd")} placeholder="macd" />
			<input
				type="number"
				{...register("profitCount")}
				placeholder="profitCount"
			/>
			<input type="number" {...register("profitCut")} placeholder="profitCut" />
			<input type="number" {...register("lossCut")} placeholder="lossCut" />
			<input type="submit" />
		</form>
	);
}
