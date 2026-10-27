import express from "express";
import { db } from "./src/config/db.js";

const app = express();
app.use(express.json());

app.get("/houses", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM houses");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke hente huse" });
  }
});

app.get("/houses/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM houses WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Hus ikke fundet" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke hente huset" });
  }
});

app.get("/teachers", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM teachers");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke hente teachers" });
  }
});

app.get("/teachers/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM teachers WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Teacher ikke fundet" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke hente teacher" });
  }
});

app.post("/teachers", async (req, res) => {
  const { name, house_id } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO teachers (name, house_id) VALUES ($1, $2) RETURNING *",
      [name, house_id],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke oprette teacher" });
  }
});

app.put("/teachers/:id", async (req, res) => {
  const { id } = req.params;
  const { name, house_id } = req.body;
  try {
    const result = await db.query(
      "UPDATE teachers SET name = $1, house_id = $2 WHERE id = $3 RETURNING *",
      [name, house_id, id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Teacher ikke fundet" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke opdatere teacher" });
  }
});

app.delete("/teachers/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      "DELETE FROM teachers WHERE id = $1 RETURNING *",
      [id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Teacher ikke fundet" });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke slette teacher" });
  }
});

app.post("/students", async (req, res) => {
  const { name, year, house_id } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO students (name, year, house_id) VALUES ($1, $2, $3) RETURNING *",
      [name, year, house_id],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke oprette student" });
  }
});

app.get("/students/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM students WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Student ikke fundet" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke hente student" });
  }
});

app.post("/students", async (req, res) => {
  const { name, house_id } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO students (name, house_id) VALUES ($1, $2) RETURNING *",
      [name, house_id],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke oprette student" });
  }
});

app.put("/students/:id", async (req, res) => {
  const { id } = req.params;
  const { name, house_id } = req.body;
  try {
    const result = await db.query(
      "UPDATE students SET name = $1, house_id = $2 WHERE id = $3 RETURNING *",
      [name, house_id, id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Student ikke fundet" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke opdatere student" });
  }
});

app.delete("/students/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      "DELETE FROM students WHERE id = $1 RETURNING *",
      [id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Student ikke fundet" });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke slette student" });
  }
});

app.get("/courses", async (req, res) => {
  try {
    const query = `
      SELECT courses.id, courses.name AS course_name, teachers.name AS teacher_name 
      FROM courses 
      LEFT JOIN teachers ON courses.teacher_id = teachers.id
    `;
    const result = await db.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke hente courses" });
  }
});

app.get("/courses/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const courseQuery = `
      SELECT courses.id, courses.name, teachers.name AS teacher_name
      FROM courses
      LEFT JOIN teachers ON courses.teacher_id = teachers.id
      WHERE courses.id = $1
    `;
    const courseResult = await db.query(courseQuery, [id]);

    if (courseResult.rows.length === 0) {
      return res.status(404).json({ error: "Course ikke fundet" });
    }

    const studentsQuery = `
      SELECT students.id, students.name
      FROM course_students
      JOIN students ON course_students.student_id = students.id
      WHERE course_students.course_id = $1
    `;
    const studentsResult = await db.query(studentsQuery, [id]);

    const courseData = courseResult.rows[0];
    courseData.students = studentsResult.rows;

    res.json(courseData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke hente course" });
  }
});

app.post("/courses", async (req, res) => {
  const { name, teacher_id } = req.body;
  try {
    const result = await db.query(
      "INSERT INTO courses (name, teacher_id) VALUES ($1, $2) RETURNING *",
      [name, teacher_id],
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke oprette course" });
  }
});

app.put("/courses/:id/teacher", async (req, res) => {
  const { id } = req.params;
  const { teacher_id } = req.body;
  try {
    const result = await db.query(
      "UPDATE courses SET teacher_id = $1 WHERE id = $2 RETURNING *",
      [teacher_id, id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Course ikke fundet" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke opdatere teacher på course" });
  }
});

app.post("/courses/:id/students", async (req, res) => {
  const { id } = req.params;
  const { student_id } = req.body;
  try {
    await db.query(
      "INSERT INTO course_students (course_id, student_id) VALUES ($1, $2)",
      [id, student_id],
    );
    res.status(201).json({ message: "Student tilføjet til course" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke tilføje student til course" });
  }
});

app.delete("/courses/:id/students/:studentId", async (req, res) => {
  const { id, studentId } = req.params;
  try {
    const result = await db.query(
      "DELETE FROM course_students WHERE course_id = $1 AND student_id = $2 RETURNING *",
      [id, studentId],
    );
    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Student var ikke tilmeldt dette course" });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke fjerne student fra course" });
  }
});

app.delete("/courses/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      "DELETE FROM courses WHERE id = $1 RETURNING *",
      [id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Course ikke fundet" });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke slette course" });
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Hogwarts API kører på http://localhost:${PORT}`);
});
