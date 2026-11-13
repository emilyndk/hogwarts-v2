import * as coursesRepository from "../repositories/courses.repository.js";
import HTTPError from "../errorhandling/HTTPError.js";
import {
  CreateCourseDTO,
  UpdateCourseDTO,
  AddStudentDTO,
} from "../dtos/courses.dto.js";

export async function getAllCourses(req, res) {
  const courses = await coursesRepository.getAllCourses();
  res.json(courses);
}

export async function getSingleCourse(req, res) {
  const { id } = req.params;
  const course = await coursesRepository.getCourseById(id);
  if (!course) {
    return res.status(404).json({ error: "Course ikke fundet" });
  }
  res.json(course);
}

export async function createCourse(req, res) {
  const data = req.body;
  const courseData = CreateCourseDTO.parse(data);
  const newCourse = await coursesRepository.createCourse(courseData);
  res.status(201).json(newCourse);
}

export async function updateCourse(req, res) {
  const { id } = req.params;
  const data = req.body;
  const course = UpdateCourseDTO.parse(data);
  const updated = await coursesRepository.updateCourse(id, course);
  if (!updated) {
    throw new HTTPError(404, "Kunne ikke opdatere course");
  }
  res.json(updated);
}

export async function updateCourseTeacher(req, res) {
  const { id } = req.params;
  const { fk_teachers } = req.body;
  const updated = await coursesRepository.updateCourseTeacher(id, fk_teachers);
  if (!updated) {
    throw new HTTPError(404, "Course not found");
  }
  res.json(updated);
}

export async function addStudentToCourse(req, res) {
  const { id } = req.params;
  const { student_id } = AddStudentDTO.parse(req.body);
  await coursesRepository.addStudentToCourse(id, student_id);

  res.status(201).json({ message: "Student tilføjet til course" });
}

export async function removeStudentFromCourse(req, res) {
  // den henter både id og studentId fra URL da man ikke skriver student_id som JSON body i en DELETE request ligesom man gjorde i PUT requesten
  const { id, studentId } = req.params;
  const removed = await coursesRepository.removeStudentFromCourse(
    id,
    studentId,
  );
  if (!removed) {
    throw new HTTPError(404, "Student var ikke tilmeldt dette course");
  }
  res.status(204).send();
}

export async function deleteCourse(req, res) {
  const { id } = req.params;
  const deleted = await coursesRepository.deleteCourse(id);
  if (!deleted) {
    throw new HTTPError(404, "Course ikke fundet");
  }
  res.status(204).send();
}
