import { db } from "../src/config/db.js";

// henter alle courses, og da courses har en relation til teachers pga foreign key fk_teachers kolonnen bruger jeg LEFT JOIN for at hente teacherens navn i setedet for bare et id tal.
// Jeg omdøber dem ved at bruge AS (fx course_name AS name), så de ser pæne ud, når de sendes til klienten.

export async function getAllCourses() {
  // jeg har ikk en kolonne der hedder name men jeg bruger AS beder jeg databasen om at give course_name et kælenavn/alias kun i det øjeblik den sender svaret tilbage
  // så i min database hedder kolonnen stadig course_name men når sql requesten kører siger jeg at den skal sende det her svar ud til controller skal du omdøbe nøglen så den hedder name i stedet for course_name
  // det gør man ofte for at json objektet der sendes til klienten kortere/pænere
  // Når Express sender dataen tilbage til Bruno, vil JSON-objektet nu se sådan her ud: {"id": 1, "name": "Potions", "teacher_name": "Severus Snape"}
  // hvis jeg ik skrev courses.course_name AS name ville der have stået  "course_name": "Potions"

  const query = `
    SELECT 
      courses.id, 
      courses.course_name AS name, 
      teachers.teacher_name AS teacher_name 
    FROM courses 
    LEFT JOIN teachers ON courses.fk_teachers = teachers.id
  `;
  // db.query er en funktion/metode der gør at Node.js kan snakke direkte med min database. det er bindeledet mellem min javascript kode og min sql database
  // denne forbindelse har en indbygget funktion der hedder .query()
  // i praksis fungerer den sådan at den tager en SQL streng som ovenstående og sender den over til databasen.
  // Den håndterer også parametre som placeholders fx sørger for at værdien fra fx [id, name] kommer ind på de rigtige pladser som $1 og $2
  const result = await db.query(query);
  return result.rows;
}

// henter courset og teacher ved hjælp af $1, så værdien af id skal stå i stedet for $1 da vi skriver [id]. Og da der står (id) efter funktionens navn getCourseById(id) der står id i funktionene parameter, så er det i controlleren at den henter det rigtige id som klienten sendte i URL, og controlleren giver så værdien af id tilbage her til repository. Altså controlleren kører denne funktion og putter id ind som parameter, og controlleren ved hvad værdien af id er pga den har hentet det fra req.params. req er requesten fra klienten og params er den url klienten har sendt i dens request fx GET http://localhost:3002/courses/7 så er 7 værdien af id
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
  // hvis courset ikke findes (length === 0) returnerer den null
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

export async function createCourse(course) {
  const query = `
    INSERT INTO courses (course_name, fk_teachers, type, level, school_year) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *;
  `;

  const values = [
    course.course_name,
    course.fk_teachers,
    course.type,
    course.level,
    course.school_year,
  ];

  const result = await db.query(query, values);
  // tager det første element ud af arrayet og sender det tilbage
  // forklaring til mig selv: result.rows indeholder ikke alle rækker i hele courses tabellen men den indeholder den/de rækker som denne SQL-forespørgsel lige har rørt og returneret.
  // Vi ved at der kun ligger et objekt i arrayet fordi vi bruger WHERE til at finde rækken by id, og siden id er unik ved vi at der kun vil komme en række. Men den pakker stadig altid resultatet ind iet array,
  // og derfor skal vi pakke det ud, og det gør vi ved at sige den kun skal returnere række 0 altså den første række.
  // Vi ved det er den første række fordi det er den eneste række.

  return result.rows[0];
}

export async function updateCourse(id, course) {
  // $1 og $2 er placeholders. Jeg fortæller den hvad der skal stå på $1 og $2's plads da jeg derefter skriver [teacher_id, id]. Den tager det i rækkefølge

  const query = `
    UPDATE courses 
    SET 
      course_name = $1, 
      fk_teachers = $2, 
      type = $3, 
      level = $4, 
      school_year = $5 
    WHERE id = $6 
    RETURNING *;
  `;

  const values = [
    course.course_name,
    course.fk_teachers,
    course.type,
    course.level,
    course.school_year,
    id,
  ];

  const result = await db.query(query, values);

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
