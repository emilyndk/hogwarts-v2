import * as studentsRepository from "../repositories/students.repository.js";

export async function getAllStudents(req, res) {
  try {
    const students = await studentsRepository.getAllStudents();
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke hente students" });
  }
}

export async function getSingleStudent(req, res) {
  try {
    const { id } = req.params;
    const student = await studentsRepository.getStudentById(id);
    if (!student) {
      return res.status(404).json({ error: "Student ikke fundet" });
    }
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke hente student" });
  }
}

export async function createStudent(req, res) {
  try {
    const { student_name, student_year, fk_house } = req.body;
    const newStudent = await studentsRepository.createStudent(
      student_name,
      student_year,
      fk_house,
    );
    res.status(201).json(newStudent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke oprette student" });
  }
}

export async function updateStudent(req, res) {
  try {
    const { id } = req.params;
    const { student_name, student_year, fk_house } = req.body;
    const updatedStudent = await studentsRepository.updateStudent(
      id,
      student_name,
      student_year,
      fk_house,
    );
    if (!updatedStudent) {
      return res.status(404).json({ error: "Student ikke fundet" });
    }
    res.json(updatedStudent);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke opdatere student" });
  }
}

export async function deleteStudent(req, res) {
  try {
    const { id } = req.params;
    const deletedStudent = await studentsRepository.deleteStudent(id);
    if (!deletedStudent) {
      return res.status(404).json({ error: "Student ikke fundet" });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke slette student" });
  }
}
