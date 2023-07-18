import { getServerSession } from "next-auth";

export default async function withSession(handler: any) {
	const session = await getServerSession();
	const user = session?.user;
	if (!user) {
		return new Response("Unauthorized", { status: 401 });
	}
	return handler(user);
}
