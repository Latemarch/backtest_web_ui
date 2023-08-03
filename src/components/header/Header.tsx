"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Header() {
	const { data } = useSession();
	console.log(data);
	return (
		<div className="flex h-16 w-full drop-shadow-sm gap-4 justify-between itmes-center items-center p-4">
			<Link href="/">
				<div>BackTest</div>
			</Link>
			<Link href="/macd">
				<div>MACD</div>
			</Link>
			{data ? (
				<div className="h-10 w-10 rounded-full overflow-hidden">
					{/*
					 eslint-disable-next-line @next/next/no-img-element
					 */}
					<img src={data.user?.image as string} alt="profileImage" />
				</div>
			) : (
				// <button onClick={() => signOut()}>signOut</button>
				<button onClick={() => signIn()}>signIn</button>
			)}
		</div>
	);
}
