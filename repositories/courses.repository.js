import { db } from "../src/config/db.js";
export async function getAllCourses() {
  const query = `
    SELECT 
      courses.id, 
      courses.course_name AS name, 
      teachers.teacher_name AS teacher_name 
    FROM courses 
    LEFT JOIN teachers ON courses.fk_teachers = teachers.id
  `;
  const result = await db.query(query);
  return result.rows;
}

export async function getCourseById(id) {
  const courseQuery = `
    SELECT 
      courses.id, 
      courses.course_name AS name, 
      teachers.teacher_name AS teacher_name
    FROM courses
    LEFT JOIN teachers ON courses.fk_teachers = teachers.id
    WHERE courses.id = $1
  `;
  const courseResult = await db.query(courseQuery, [id]);
  if (courseResult.rows.length === 0) return null;

  const studentsQuery = `
    SELECT 
      students.id, 
      students.student_name AS name
    FROM course_students
    JOIN students ON course_students.fk_students = students.id
    WHERE course_students.fk_courses = $1
  `;
  const studentsResult = await db.query(studentsQuery, [id]);

  const courseData = courseResult.rows[0];
  courseData.students = studentsResult.rows;
  return courseData;
}

export async function createCourse(name, teacher_id) {
  const result = await db.query(
    "INSERT INTO courses (course_name, fk_teachers) VALUES ($1, $2) RETURNING *",
    [name, teacher_id],
  );
  return result.rows[0];
}
export async function updateCourse(id, course_name, fk_teachers) {
  const result = await db.query(
    "UPDATE courses SET course_name = $1, fk_teachers = $2 WHERE id = $3 RETURNING *",
    [course_name, fk_teachers, id],
  );
  // tager det første element ud af arrayet og sender det tilbage
  // forklaring til mig selv: result.rows indeholder ikke alle rækker i hele courses tabellen men den indeholder den/de rækker som denne SQL-forespørgsel lige har rørt og returneret. Vi ved at der kun ligger et objekt i arrayet fordi vi bruger WHERE til at finde rækken by id, og siden id er unik ved vi at der kun vil komme en række. Men den pakker stadig altid resultatet ind iet array, og derfor skal vi pakke det ud, og det gør vi ved at sige den kun skal returnere række 0 altså den første række. Vi ved det er den første række fordi det er den eneste række.

  return result.rows[0];
}

export async function updateCourseTeacher(id, teacher_id) {
  const result = await db.query(
    // $1 og $2 er placeholders. Jeg fortæller den hvad der skal stå på $1 og $2's plads da jeg derefter skriver [teacher_id, id]. Den tager det i rækkefølge
    "UPDATE courses SET fk_teachers = $1 WHERE id = $2 RETURNING *",
    [teacher_id, id],
  );
  return result.rows[0];
}

export async function addStudentToCourse(course_id, student_id) {
  await db.query(
    "INSERT INTO course_students (fk_courses, fk_students) VALUES ($1, $2)",
    [course_id, student_id],
  );

  //Der er intet RETURNING * på. Den indsætter bare rækken i databasen og slutter der da det er in POST request
}

export async function removeStudentFromCourse(course_id, student_id) {
  const result = await db.query(
    "DELETE FROM course_students WHERE fk_courses = $1 AND fk_students = $2 RETURNING *",
    [course_id, student_id],
  );
  return result.rows[0];
}

export async function deleteCourse(id) {
  const result = await db.query(
    "DELETE FROM courses WHERE id = $1 RETURNING *",
    [id],
  );
  return result.rows[0];
}
