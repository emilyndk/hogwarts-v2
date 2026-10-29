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

export async function updateCourseTeacher(id, teacher_id) {
  const result = await db.query(
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
