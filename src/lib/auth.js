import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.DB_URI);
const db = client.db();

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,

    trustedOrigins: [
        "http://localhost:3000",
        "https://drave-client-2.vercel.app/",
    ],

    emailAndPassword: {
        enabled: true,
    },

    emailVerification: {
        enabled: true,
        required: true,
        sendWelcomeEmail: true,
    },

    database: mongodbAdapter(db, {
        client,
    }),
});