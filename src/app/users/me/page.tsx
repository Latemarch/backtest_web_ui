import LogOut from "@/components/Me/LogOut";
import client from "@/service/client/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page() {
	const data = await getServerSession();
	console.log("user!!", data?.user);
	if (!data?.user) redirect("/");

	const { name, email, image } = data.user;
	const user = await client.user.findUnique({
		where: {
			email: email as string,
		},
	});
	console.log(user);
	if (!user) redirect("/");

	return (
		<div>
			{user.id}
			<LogOut />
		</div>
	);
}
