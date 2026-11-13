import { db } from "../src/config/db.js";

export async function getAllStudents() {
  const result = await db.query("SELECT * FROM students");
  return result.rows;
}

export async function getStudentById(id) {
  const result = await db.query("SELECT * FROM students WHERE id = $1", [id]);
  return result.rows[0];
}

export async function createStudent(student_name, student_year, fk_house) {
  const result = await db.query(
    "INSERT INTO students (student_name, student_year, fk_house) VALUES ($1, $2, $3) RETURNING *",
    [student_name, student_year, fk_house],
  );
  return result.rows[0];
}

export async function updateStudent(id, student) {
  const query = `
    UPDATE students 
    SET student_name = $1, student_year = $2, fk_house = $3 
    WHERE id = $4 
    RETURNING *;
  `;
  const values = [
    student.student_name,
    student.student_year,
    student.fk_house,
    id,
  ];

  const result = await db.query(query, values);
  return result.rows[0];
}

export async function deleteStudent(id) {
  const result = await db.query(
    "DELETE FROM students WHERE id = $1 RETURNING *",
    [id],
  );
  return result.rows[0];
}
