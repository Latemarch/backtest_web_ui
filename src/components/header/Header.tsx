"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Header() {
	const { data } = useSession();
	return (
		<div className="flex h-16 w-full drop-shadow-sm gap-4 justify-between itmes-center">
			BackTest
			{data ? (
				<button onClick={() => signOut()}>signOut</button>
			) : (
				<button onClick={() => signIn()}>signIn</button>
			)}
		</div>
	);
}
