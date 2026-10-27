import { db } from "../src/config/db.js";

export async function getAllCourses() {
  const result = await db.query("SELECT * FROM courses");
  return result.rows;
}

export async function getCourseById(id) {
  const result = await db.query("SELECT * FROM courses WHERE id = $1", [id]);

  if (result.rowCount === 0) {
    return null;
  } else {
    return result.rows[0];
  }
}
