import client from "@/service/client/client";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
	const { searchParams } = new URL(req.url);
	const gte = Number(searchParams.get("gte"));
	const lte = Number(searchParams.get("lte"));

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
