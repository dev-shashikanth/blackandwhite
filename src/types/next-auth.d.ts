import "next-auth";

declare module "next-auth" {
  interface User {
    _id?: string;
    firstName?: string;
    lastName?: string;
  }
  interface Session {
    user: {
      _id?: string;
      firstName?: string;
      lastName?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    firstName?: string;
    lastName?: string;
  }
}
