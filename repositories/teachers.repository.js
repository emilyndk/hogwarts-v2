import { db } from "../src/config/db.js";

export async function getAllTeachers() {
  const result = await db.query("SELECT * FROM teachers");
  return result.rows;
}

export async function getTeacherById(id) {
  // "Sæt værdien af min id-variabel ind på pladsen for $1". Værdien af [id] får den fra controller

  const result = await db.query("SELECT * FROM teachers WHERE id = $1", [id]);

  if (result.rowCount === 0) {
    return null;
  } else {
    return result.rows[0];
  }
}

export async function createTeacher(teacher_name, fk_house) {
  const result = await db.query(
    "INSERT INTO teachers (teacher_name, fk_house) VALUES ($1, $2) RETURNING *",
    [teacher_name, fk_house],
  );
  return result.rows[0];
}

export async function updateTeacher(id, teacher_name, fk_house) {
  const result = await db.query(
    "UPDATE teachers SET teacher_name = $1, fk_house = $2 WHERE id = $3 RETURNING *",
    [teacher_name, fk_house, id],
  );
  return result.rows[0];
}

export async function deleteTeacher(id) {
  const result = await db.query(
    "DELETE FROM teachers WHERE id = $1 RETURNING *",
    [id],
  );
  return result.rows[0];
}
