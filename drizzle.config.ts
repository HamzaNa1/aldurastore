import type { Config } from "drizzle-kit";
import "dotenv/config";
import { config } from "dotenv";

config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL environment variable is required.");
}

export default {
	schema: "./src/lib/schema.ts",
	out: "./src/lib/migrations",
	driver: "mysql2",
	dbCredentials: {
		uri: process.env.DATABASE_URL!,
	},
} satisfies Config;
