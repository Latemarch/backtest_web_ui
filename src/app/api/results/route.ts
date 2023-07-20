import client from "@/service/client/client";
import { NextResponse } from "next/server";

export type UploadDailyResult = {
	fluctuation: number[];
	profitAverage: number[];
	dailyReturn: number[];
};
export type ResultProps = {
	asset: string;
	strategy: string;
	constants: string;
	result: UploadDailyResult;
};
type QueryCondition = {
	asset?: string;
	strategy?: string;
	constants?: string;
};

export async function GET(req: Request, res: Response) {
	const { searchParams } = new URL(req.url);
	const asset = searchParams.get("asset");
	const strategy = searchParams.get("strategy");
	const constants = searchParams.get("constants");

	// if (!asset || !strategy || !constants)
	// 	return NextResponse.json({ ok: false });

	let queryCondition: QueryCondition = {};
	if (asset) queryCondition.asset = asset;
	if (strategy) queryCondition.strategy = strategy;
	if (constants) queryCondition.constants = constants;

	const data = await client.bTResult.findMany({
		where: queryCondition,
	});
	if (data.length === 0) return NextResponse.json({ ok: false });
	return NextResponse.json({ ok: true, data });
}

export async function POST(req: Request) {
	console.log("post start");

	const request = await req.json();
	const body = await JSON.parse(request.body);
	const {
		asset,
		strategy,
		constants,
		result: { fluctuation, profitAverage, dailyReturn },
	} = body;
	const data = await client.bTResult.findFirst({
		where: { asset, strategy, constants },
	});

	if (data) {
		console.log("already exsits");
		return NextResponse.json({ ok: false, data });
	}

	const result = await client.bTResult.create({
		data: {
			asset,
			strategy,
			constants,
			dailyReturn,
			profitAverage,
			fluctuation,
		},
	});
	return NextResponse.json({ ok: true, data: result });
}
