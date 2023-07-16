"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
	const session = useSession();
	console.log(session);
	return (
		<div className="h-16 w-full drop-shadow-sm gap-4">
			BackTest
			<button onClick={() => signIn()}>signIn</button>
			<button onClick={() => signOut()}>signOut</button>
		</div>
	);
}
