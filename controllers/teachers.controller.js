import * as teachersRepository from "../repositories/teachers.repository.js";

export async function getAllTeachers(req, res) {
  try {
    const teachers = await teachersRepository.getAllTeachers();
    res.json(teachers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke hente teachers" });
  }
}

export async function getSingleTeacher(req, res) {
  try {
    const { id } = req.params;
    const teacher = await teachersRepository.getTeacherById(id);
    if (!teacher) {
      return res.status(404).json({ error: "Teacher ikke fundet" });
    }
    res.json(teacher);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke hente teacher" });
  }
}

export async function createTeacher(req, res) {
  try {
    const { teacher_name, fk_house } = req.body;
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
