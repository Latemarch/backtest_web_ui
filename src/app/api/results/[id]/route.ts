import client from "@/service/client/client";
import { NextResponse } from "next/server";

export async function GET(
	req: Request,
	{ params: { id } }: { params: { id: string } }
) {
	const data = await client.bTResult.findUnique({
		where: {
			id: Number(id),
		},
	});
	if (!data) NextResponse.json({ ok: false, status: "data not found" });
	return NextResponse.json({ ok: true, data });
}
