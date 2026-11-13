import { db } from "../src/config/db.js";

export async function getAllExams() {
  const query = `SELECT
    exams.exam_id,
    students.student_name,
      courses.course_name,
      grades.name
      FROM exams
      JOIN students ON exams.student_id = students.id
       JOIN courses ON exams.course_id = courses.id
    JOIN grades ON exams.grade_id = grades.grade_id`;
  const result = await db.query(query);
  return result.rows;
}

export async function getExamById(id) {
  const query = `
    SELECT 
      exams.exam_id,
      students.student_name,
      courses.course_name,
      grades.name
    FROM exams
    JOIN students ON exams.student_id = students.id
    JOIN courses ON exams.course_id = courses.id
    JOIN grades ON exams.grade_id = grades.grade_id
    WHERE exams.exam_id = $1;
  `;

  // detaljeret forklaring af ovenstående query
  // 1. SELECT exams.exam_id, students.student_name, courses.course_name, grades.grade_name
  // - her vælger jeg hvad jeg vil have med i det svar der kommer tilbage.
  // - i stedet for at bare få id'er vælger jeg at jeg vil få vist fx navnet på student som jeg får fra kolonnen name i student tabellen
  // 2. FROM exams
  // - det er min hovedtabel
  // 3. JOIN students ON exams.student_id = students.id
  // - jeg siger den skal tage kolonnen student_id på tabellen exams og match den værdi med id over i students tabellen så vi kan få elevens rigtige navn
  // de 2 næste linjer gør det samme som ovenstående linje
  // 4. WHERE exams.exam_id = $1;
  // - Sørg for, at vi kun henter den specifikke exam, som brugeren har spurgt efter via URL'en i fx bruno (hvilket repositoryet får fra controlleren som kører denne funktion og putter id ind som argument i parametret)

  const result = await db.query(query, [id]);

  if (result.rowCount === 0) {
    return null;
  } else {
    return result.rows[0];
  }
}

export async function createExam(examData) {
  const query = `INSERT INTO exams (course_id, student_id, grade_id)
    VALUES ($1, $2, $3)
    RETURNING *;`;

  const values = [examData.course_id, examData.student_id, examData.grade_id];
  const result = await db.query(query, values);
  return result.rows[0];
}

export async function updateExam(id, exam) {
  const query = `UPDATE exams
    SET
    course_id = $1,
    student_id = $2,
    grade_id = $3
    WHERE exam_id = $4
    RETURNING *;
    `;
  // id ligger ikke inde i exam objektet som har mange informationer fordi jeg i controlleren hev id ud separat
  //derfor skriver jeg ikke exam.id ligesom jeg har haft exam. før alle de andre
  // det er fordi controlleren bare har puttet argumenter ind i funktionen exam og id, og exam indeholder ting som course_id, student_id osv
  // id kommer jo fra req.params hvorimod de andre værdier kommer fra req.body
  // id kommer fra URL'en (req.params), fordi det er adressen på det specifikke element, vi prøver at ændre på.
  const values = [exam.course_id, exam.student_id, exam.grade_id, id];

  const result = await db.query(query, values);
  return result.rows[0];
}

export async function deleteExam(id) {
  const result = await db.query(
    "DELETE FROM exams WHERE exam_id = $1 RETURNING *",
    [id],
  );
  return result.rows[0];
}
