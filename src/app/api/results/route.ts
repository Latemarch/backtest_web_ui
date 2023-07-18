import client from "@/service/client/client";
import withSession from "@/service/server/withSession";
import { NextResponse } from "next/server";

type Props = {
	asset: string;
	strategy: string;
	constants: string;
	dailyReturn: string;
};

export async function GET(req: Request, res: Response) {
	return withSession(async (user: any) => {
		console.log(user);
		return NextResponse.json({ data: "djd" });
	});
}

export async function POST(req: Request) {
	return withSession(async (user: any) => {
		const { asset, strategy, constants, dailyReturn }: Props = await req.json();
		const { email } = user;
		const data = await client.bTResult.findFirst({
			where: { asset, strategy, constants },
		});

		if (data) return NextResponse.json({ ok: true, data });

		const result = await client.bTResult.create({
			data: {
				email,
				asset,
				strategy,
				constants,
				dailyReturn: JSON.parse(dailyReturn),
			},
		});
		return NextResponse.json({ ok: true, data: result });
	});
}
