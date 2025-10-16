import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import UserModel from "@/models/User";
import connectDB from "@/lib/db/connectDB";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await connectDB();
        try {
          const user = await UserModel.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("No user found with this email");
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordCorrect) {
            throw new Error("Incorrect password");
          }

          return {
            _id: user._id?.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          };
        } catch (error: any) {
          console.error("🔴 Auth Error:", error.message);
          throw new Error(error.message || "Something went wrong");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      try {
        if (user) {
          token._id = user._id;
          token.firstName = user.firstName || "";
          token.lastName = user.lastName || "";
          token.email = user.email;
        }
        return token;
      } catch (error) {
        console.error("🔴 JWT Callback Error:", error);
        return token;
      }
    },
    async session({ session, token }) {
      try {
        if (!token) {
          throw new Error("Session expired");
        }
        if (token) {
          session.user = {
            _id: token._id as string,
            firstName: token.firstName as string,
            lastName: token.lastName as string,
            email: token.email as string,
            expires: new Date(
              Date.now() + 7 * 24 * 60 * 60 * 1000
            ).toISOString(),
          };
        }
        return session;
      } catch (error) {
        console.error("🔴 Session Callback Error:", error);
        return session;
      }
    },
  },
  pages: {
    signIn: "/login", // Ensure it matches your login route
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, //7 days
  },
  secret: process.env.JWT_SECRET,
};
