import express from "express";
import housesRouter from "./routers/houses.router.js";
import teachersRouter from "./routers/teachers.router.js";
import studentsRouter from "./routers/students.router.js";
import coursesRouter from "./routers/courses.router.js";

const app = express();

app.use(express.json());

app.use("/houses", housesRouter);
app.use("/teachers", teachersRouter);
app.use("/students", studentsRouter);
app.use("/courses", coursesRouter);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Hogwarts API kører på http://localhost:${PORT}`);
});
