import { db } from "../src/config/db.js";

export async function getAllGrades() {
  const result = await db.query("SELECT * FROM grades");

  return result.rows;
}

export async function getGradeById(id) {
  const result = await db.query("SELECT * FROM grades WHERE grade_id = $1", [
    id,
  ]);

  if (result.rowCount === 0) {
    return null;
  } else {
    return result.rows[0];
  }
}
