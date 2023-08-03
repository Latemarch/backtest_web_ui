import client from "../client/client";

export default async function signUp({ email }: { email?: string | null }) {
	if (!email) return "no email";
	const exsitingUser = await client.user.findUnique({
		where: {
			email,
		},
	});

	if (exsitingUser) return "user is already exists";

	const result = await client.user.create({
		data: {
			email,
		},
	});
	return result;
}
