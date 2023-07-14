import client from "@/service/client/client";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
	const { searchParams } = new URL(req.url);
	const gte = searchParams.get("gte");
	const lte = searchParams.get("lte");

	console.log("data", gte, lte);
	let whereClause = {};

	whereClause = gte ? { ...whereClause, gte } : whereClause;
	whereClause = lte ? { ...whereClause, lte } : whereClause;

	const candles = await client.btcusd.findMany({
		where: {
			id: whereClause,
		},
	});
	return NextResponse.json(candles);
}
