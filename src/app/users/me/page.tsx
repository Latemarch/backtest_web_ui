import client from "@/service/client/client";
import { getServerSession } from "next-auth";

export default async function page() {
	const data = await getServerSession();
	console.log("user!!", data?.user);
	if (!data?.user) return "no User";
	const { name, email, image } = data.user;
	const user = await client.user.findUnique({
		where: {
			email: email as string,
		},
	});
	console.log(user);

	return user && <div>{user.id}</div>;
}
