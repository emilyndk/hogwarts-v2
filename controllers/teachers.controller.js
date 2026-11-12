//importerer alt det der ligger i filen teachers.repository.js og giver det navnet teachersRepository
import * as teachersRepository from "../repositories/teachers.repository.js";
import HTTPError from "../errorhandling/HTTPError.js";

//jeg skriver ikke en 500 statuskode fejl her hvis den ikke kan hente teachers, fordi det har jeg allerede sagt den skal gøre i errorhandler.js
// da jeg skrev let statusCode = err.statusCode || 500; sagde jeg at statuskoden skal være fejlobjektets statuskode som jeg ville skrive sådan "throw new HTTPError(404, "...")"
// og hvis der ik er nogen throw new HTTTPError (som der nemlig ik er her) så vil den bruge 500..
// så 500 er standard medmindre jeg faktisk skriver på funktionen hvad statuskode og message skal være. jeg skriver ikke throw new HTTPError her og derfor vil den bruge statuskode 500 hvis den ikkke kan hente teachers

export async function getAllTeachers(req, res) {
  // henter teachers data ved at sige at den skal gå ind i teachersRepository (teachers.repository.js) og hente getAllTeachers funktionen der ligger derinde
  const teachers = await teachersRepository.getAllTeachers();
  // sender teachers data tilbage til klienten som JSON
  res.json(teachers);
}

export async function getSingleTeacher(req, res) {
  //med objektdekonstruering opretter den en variabel id så den leder efter nøglen id i req.params (leder efter id i URL'en i teachers.router.js)
  const { id } = req.params;
  // henter data for den teacher der matcher id'et ved at sige at den skal gå ind i teachersRepository (teachers.repository.js) og hente getTeacherById funktionen
  // Controlleren henter ID'et ud (const { id } = req.params;) og sender det videre til repositoryet som et argument inde i funktionen, altså efter funktionens navn getTeacherById står der (id) og det er fra const id som har værdien. I repository filen har vi også denne funktion med argumentet id inde i paranteserne () efter funktionens navn, så derfor ved reposity nu hvad værdien af id er, da controlleren i denne linje giver den værdien
  const teacher = await teachersRepository.getTeacherById(id);

  //tjekker om der findes en teacher med det id. !teacher betyder at den ikke findes
  if (!teacher) {
    // bruger new til at bede class'en om at bygge et nyt fejl-objekt baseret på den skabelon i HTTPError.js
    throw new HTTPError(404, "Teacher not found");
    //hvis teacher med det id ikke findes sender den en 404 fejl tilbage til Bruno med en besked om at teacher ikke blev fundet
  }
  //hvis teacher med det id findes sender den teacher med det id tilbage til Bruno som JSON
  res.status(200).json(teacher);
}

export async function createTeacher(req, res) {
  //(skriver body i stedet for params fordi den kigger i body'en af requesten og ikke i URL'en da det er en POST request. Dataen skrives som JSON i body fanen i Bruno)
  // Da Express modtog JSON-tekst pakker den det ud og lægger det ind i en boks der hedder req.body.
  // Nu trækker controlleren værdierne af teacher_name og fk_house som ligger i req.body ud
  const { teacher_name, fk_house } = req.body;
  // laver en variabel newTeacher der indeholder dataen for den teacher der lige er blevet oprettet ved at sige at den skal gå ind i teachersRepository (teachers.repository.js) og hente createTeacher funktionen der ligger derinde
  const newTeacher = await teachersRepository.createTeacher(
    teacher_name,
    fk_house,
  );
  res.status(201).json(newTeacher);
}

export async function updateTeacher(req, res) {
  const { id } = req.params;
  const { teacher_name, fk_house } = req.body;
  const updated = await teachersRepository.updateTeacher(
    id,
    teacher_name,
    fk_house,
  );
  if (!updated) {
    throw new HTTPError(404, "Teacher ikke fundet");
  }
  res.json(updated);
}

export async function deleteTeacher(req, res) {
  const { id } = req.params;
  const deleted = await teachersRepository.deleteTeacher(id);
  if (!deleted) {
    throw new HTTPError(404, "Teacher ikke fundet");
  }
  res.status(204).send();
}
