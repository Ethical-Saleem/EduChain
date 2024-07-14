import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/auth/login`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (res.ok && data.accessToken) {
          return data;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/app/login",
    signOut: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.user = user.user;
        token.school = user.school;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      session.school = token.school;
      return session;
    },
  },
};

export default NextAuth(authOptions);