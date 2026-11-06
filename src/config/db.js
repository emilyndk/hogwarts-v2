// indlæser miljøvariabler fra .env. så vscode kan få adgang til værdierne fx passwordet gennem process.env
import "dotenv/config";
import { Pool } from "pg";

// opretter en databaseforbindelse og gør den tilgængelig for andre filer i projektet. export betyder, at andre filer kan importere det. en anden fil kan skrive: import { db } from "./db.js"; og bruge db til at sende requests til databasen
export const db = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME,
});
