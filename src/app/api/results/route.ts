import client from "@/service/client/client";
import withSession from "@/service/server/withSession";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

type Props = {
	asset: string;
	strategy: string;
	constants: string;
	dailyReturn: string;
};

export async function GET(req: Request, res: Response) {
	const { searchParams } = new URL(req.url);
	const asset = searchParams.get("asset");
	const strategy = searchParams.get("strategy");
	const constants = searchParams.get("constants");
	console.log(asset, strategy, constants);

	if (!asset || !strategy || !constants)
		return NextResponse.json({ ok: false });

	const data = await client.bTResult.findFirst({
		where: {
			asset,
			strategy,
			constants,
		},
	});
	console.log(data);
	if (!data) return NextResponse.json({ ok: false });
	return NextResponse.json({ ok: true, data });
}

export async function POST(req: Request) {
	const { asset, strategy, constants, dailyReturn }: Props = await req.json();
	const data = await client.bTResult.findFirst({
		where: { asset, strategy, constants },
	});

	if (data) {
		return NextResponse.json({ ok: false, data });
	}

	const result = await client.bTResult.create({
		data: {
			asset,
			strategy,
			constants,
			dailyReturn: JSON.parse(dailyReturn),
		},
	});
	return NextResponse.json({ ok: true, data: result });
}
