import { config } from "dotenv";
import { resolve } from "path";
import { existsSync } from "fs";
import { AppDataSource } from "./data-source";

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

AppDataSource.initialize()
  .then(async () => {
    console.log("Running migrations...");
    await AppDataSource.runMigrations();
    console.log("Migrations completed successfully!");
    await AppDataSource.destroy();
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error running migrations:", error);
    process.exit(1);
  });
