import client from "@/service/client/client";

export default async function page({params:{id}}:{params:{id:string}}) {
	const user = await client.user.findUnique({
		where: {
      id : Number(id)
		},
	});

	return user && <div>{user.id}</div>;
}
