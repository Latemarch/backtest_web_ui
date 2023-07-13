"use client";
import { signIn, signOut } from "next-auth/react";

export default function Header() {
	return (
		<div className="h-16 w-full drop-shadow-sm gap-4">
			BackTest
			<button onClick={() => signIn()}>signIn</button>
			<button onClick={() => signOut()}>signOut</button>
		</div>
	);
}
