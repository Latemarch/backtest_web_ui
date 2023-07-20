import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_OAUTH_ID!!,
			clientSecret: process.env.GOOGLE_OAUTH_SECRET!!,
		}),
	],
	callbacks: {
		async signIn({ user }) {
			return true;
		},
		async session({ session, token }) {
			// addUser(token.email);
			return session;
		},
	},
	// pages: {
	// 	signIn: "/auth/signin",
	// },
};
