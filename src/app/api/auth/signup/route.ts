import client from "@/service/client/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const email = await req.json();

	const existingUser = await client.user.findUnique({
		where: { email },
	});

	if (existingUser) {
		console.log("user is already sxists");
		return new Response("User already exsits", { status: 409 });
	}

	const result = await client.user.create({
		data: {
			email,
		},
	});
	return NextResponse.json({ ok: true, result });
}
