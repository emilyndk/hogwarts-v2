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

export async function createTeacher(teacherData) {
  const query = `
    INSERT INTO teachers (teacher_name, fk_house, employment_start, currently_active, deceased)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [
    teacherData.teacher_name,
    teacherData.fk_house,
    teacherData.employment_start,
    teacherData.currently_active,
    teacherData.deceased,
  ];
  // sætter både min query og values ind i databasen og venter på at databasen returnerer et svar-objekt som jeg gemmer i variablen result
  // den returnerer det tilbage hertil koden fordi der i queryen til sidst står RETURNING *. normalt ville den jo i pgadming bare sige "Query returned successfully" uden at faktisk vise rækkerne
  const result = await db.query(query, values);
  return result.rows[0];
}

export async function updateTeacher(id, teacher) {
  const query = `
    UPDATE teachers 
    SET 
      teacher_name = $1, 
      fk_house = $2, 
      employment_start = $3, 
      currently_active = $4, 
      deceased = $5
    WHERE id = $6
    RETURNING *;
  `;
  const values = [
    teacher.teacher_name,
    teacher.fk_house,
    teacher.employment_start,
    teacher.currently_active,
    teacher.deceased,
    id,
  ];

  const result = await db.query(query, values);
  return result.rows[0];
}

export async function deleteTeacher(id) {
  const result = await db.query(
    "DELETE FROM teachers WHERE id = $1 RETURNING *",
    [id],
  );
  return result.rows[0];
}
