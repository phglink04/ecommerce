import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { MongoClient } from "mongodb";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET, // Đảm bảo có biến này trong .env.local
    session: { strategy: "jwt" }, // Dùng JWT thay vì sessions (mặc định với App Router)
    adapter: MongoDBAdapter({
        client: new MongoClient(process.env.MONGODB_URI),
        dbName: process.env.MONGODB_DB,
    }),
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
