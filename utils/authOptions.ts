import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import connectDB from "@/config/database";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // Invoked on successful signin
    async signIn({ profile }) {
      if (!profile) return false;

      await connectDB();
      const userExists = await User.findOne({ email: profile.email });

      if (!userExists) {
        await User.create({
          username: profile.name,
          email: profile.email,
          image: (profile as any).picture,
        });
      }

      return true;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session }) {
      if (!session.user?.email) return session;

      const user = await User.findOne({ email: session.user.email });

      return {
        ...session,
        user: {
          ...session.user,
          id: user._id.toString(),
        },
      };
    },
  },
};
