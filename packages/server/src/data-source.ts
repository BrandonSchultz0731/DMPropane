import { DataSource } from "typeorm";
import { config } from "dotenv";
import { resolve } from "path";
import { existsSync } from "fs";
import { User } from "./users/user.entity";

// Load environment variables from .env file
// Try multiple possible locations
const possiblePaths = [
  resolve(__dirname, "../.env"), // packages/server/.env
  resolve(__dirname, "../../../.env"), // root .env
  resolve(process.cwd(), ".env"), // current working directory
];

for (const envPath of possiblePaths) {
  if (existsSync(envPath)) {
    config({ path: envPath });
    break;
  }
}

// Also try default dotenv behavior (current directory)
config();

const databaseUrl = process.env.DATABASE_URL;

export const AppDataSource = new DataSource({
  type: "postgres",
  ...(databaseUrl
    ? {
      url: databaseUrl,
      ssl:
        process.env.NODE_ENV === "production"
          ? { rejectUnauthorized: false }
          : false,
    }
    : {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || "5432", 10),
      username: process.env.DB_USERNAME || "postgres",
      password: process.env.DB_PASSWORD || "postgres",
      database: process.env.DB_NAME || "postgres",
    }),
  entities: [User],
  migrations: process.env.NODE_ENV === 'production' ? ['dist/migrations/**/*.js'] : ['src/migrations/**/*.ts'],
  synchronize: false,
});
