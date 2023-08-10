import UserProfile from "@/components/User/UserProfile";
import client from "@/service/client/client";
import { getServerSession } from "next-auth";

export default async function page() {
	const data = await getServerSession();
	if (!data?.user) return "no User";

	const { name, email, image } = data.user;
	console.log("data", data);

	const user = await client.user.findUnique({
		where: {
			email: email as string,
		},
	});

	if (!user) return "user not found";

	if (!user.name) user.name = name as string;

	return (
		user && (
			<div>
				<UserProfile user={{ ...user, image }} />
			</div>
		)
	);
}
