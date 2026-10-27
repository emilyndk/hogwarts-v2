import { db } from "../src/config/db.js";

export async function getAllTeachers() {
  const result = await db.query("SELECT * FROM teachers");
  res.json(result.rows);
}

export async function getTeacherById(id) {
  const result = await db.query("SELECT * FROM teachers WHERE id = $1", [id]);

  if (result.rowCount === 0) {
    return null;
  } else {
    return result.rows[0];
  }
}
