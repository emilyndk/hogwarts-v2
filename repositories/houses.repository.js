import { db } from "../src/config/db.js";

export async function getAllHouses() {
  const result = await db.query("SELECT * FROM houses");

  return result.rows;
}

export async function getHouseById(id) {
  const result = await db.query("SELECT * FROM houses WHERE id = $1", [id]);

  if (result.rowCount === 0) {
    return null;
  } else {
    return result.rows[0];
  }
}
