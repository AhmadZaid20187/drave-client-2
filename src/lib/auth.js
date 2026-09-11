import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.DB_URI);
const db = client.db();

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    emailVerification: {
        enabled: true,
        required: true,
        sendWelcomeEmail: true, // Sends welcome email after successful verification
    },

    database: mongodbAdapter(db, {
        // Optional: if you don't provide a client, database transactions won't be enabled.
        client
    }),
});