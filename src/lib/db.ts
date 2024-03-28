// import "server-only";

import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

const connection = await mysql.createConnection({
	database: "railway",
	host: process.env["DATABASE_HOST"],
	user: process.env["DATABASE_USERNAME"],
	password: process.env["DATABASE_PASSWORD"],
	port: 42846,
});

const db = drizzle<typeof schema>(connection, {
	schema: schema,
	mode: "default",
});

export default db;
