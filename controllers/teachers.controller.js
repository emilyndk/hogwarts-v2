//importerer alt det der ligger i filen teachers.repository.js og giver det navnet teachersRepository
import * as teachersRepository from "../repositories/teachers.repository.js";

export async function getAllTeachers(req, res) {
  try {
    // henter teachers data ved at sige at den skal gå ind i teachersRepository (teachers.repository.js) og hente getAllTeachers funktionen der ligger derinde
    const teachers = await teachersRepository.getAllTeachers();
    // sender teachers data tilbage til klienten som JSON
    res.json(teachers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke hente teachers" });
  }
}

export async function getSingleTeacher(req, res) {
  try {
    //med objektdekonstruering opretter den en variabel id så den leder efter nøglen id i req.params (leder efter id i URL'en i teachers.router.js)
    const { id } = req.params;
    // henter data for den teacher der matcher id'et ved at sige at den skal gå ind i teachersRepository (teachers.repository.js) og hente getTeacherById funktionen
    //Controlleren henter ID'et ud (const { id } = req.params;) og sender det videre til repositoryet som et argument inde i funktionen, altså efter funktionens navn getTeacherById står der (id) og det er fra const id som har værdien. I repository filen har vi også denne funktion med argumentet id inde i paranteserne () efter funktionens navn, så derfor ved reposity nu hvad værdien af id er, da controlleren i denne linje giver den værdien
    const teacher = await teachersRepository.getTeacherById(id);

    //tjekker om der findes en teacher med det id. !teacher betyder at den ikke findes
    if (!teacher) {
      //hvis teacher med det id ikke findes sender den en 404 fejl tilbage til Bruno med en besked om at teacher ikke blev fundet
      return res.status(404).json({ error: "Teacher ikke fundet" });
    }
    //hvis teacher med det id findes sender den teacher med det id tilbage til Bruno som JSON
    res.json(teacher);
  } catch (err) {
    //hvis der opstår en fejl i tryblokken sender den en 500 fejl tilbage til Bruno med en besked om at teacher ikke kunne hentes
    console.error(err);
    res.status(500).json({ error: "Kunne ikke hente teacher" });
  }
}

export async function createTeacher(req, res) {
  try {
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke oprette teacher" });
  }
}

export async function updateTeacher(req, res) {
  try {
    const { id } = req.params;
    const { teacher_name, fk_house } = req.body;
    const updated = await teachersRepository.updateTeacher(
      id,
      teacher_name,
      fk_house,
    );
    if (!updated) {
      return res.status(404).json({ error: "Teacher ikke fundet" });
    }
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke opdatere teacher" });
  }
}

export async function deleteTeacher(req, res) {
  try {
    const { id } = req.params;
    const deleted = await teachersRepository.deleteTeacher(id);
    if (!deleted) {
      return res.status(404).json({ error: "Teacher ikke fundet" });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke slette teacher" });
  }
}
