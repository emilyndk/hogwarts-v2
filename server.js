import express from "express";
import housesRouter from "./routers/houses.router.js";
import teachersRouter from "./routers/teachers.router.js";
import studentsRouter from "./routers/students.router.js";
import coursesRouter from "./routers/courses.router.js";

const app = express();

// app.use er en metode i Express der aktiverer middleware som er funktioner der kører mellem request og response. det låser op for at Express kan forstå JSON data i request body'en. Hvis man ikke skriver app.use(express.json()) vil Express ikke kunne forstå JSON dataen og man vil få en 400 fejl når man prøver at sende data til serveren
app.use(express.json());

//fortæller Express at når der kommer en request til URL'en i Bruno eller browser der starter med /houses skal den gå ind i housesRouter skal Express sende requesten videre til housesRouter (houses.router.js) (derfra sender den requesten videre til controller)
app.use("/houses", housesRouter);
app.use("/teachers", teachersRouter);
app.use("/students", studentsRouter);
app.use("/courses", coursesRouter);

// fortæller at den skal vælge porten der er sat i miljøvariablen PORT. Hvis der ikke er en tildelt port skal den bruge port 3002

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  // fortæller at serveren kører og hvilken port den kører på, enten 3002 eller den port der er sat i miljøvariablen PORT
  console.log(`Hogwarts API kører på http://localhost:${PORT}`);
});
