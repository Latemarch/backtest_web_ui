"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
	const { data } = useSession();
	return (
		<div className="flex h-16 w-full drop-shadow-sm gap-4 justify-between itmes-center items-center p-4">
			<div>BackTest</div>
			<Link href="/macd">
				<div>MACD</div>
			</Link>
			{data ? (
				<button onClick={() => signOut()}>signOut</button>
			) : (
				<button onClick={() => signIn()}>signIn</button>
			)}
		</div>
	);
}
