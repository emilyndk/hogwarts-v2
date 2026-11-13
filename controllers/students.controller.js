import * as studentsRepository from "../repositories/students.repository.js";
import HTTPError from "../errorhandling/HTTPError.js";
import { UpdateStudentDTO, CreateStudentDTO } from "../dtos/students.dto.js";

export async function getAllStudents(req, res) {
  const students = await studentsRepository.getAllStudents();
  res.json(students);
}

export async function getSingleStudent(req, res) {
  const { id } = req.params;
  const student = await studentsRepository.getStudentById(id);
  if (!student) {
    throw new HTTPError(404, "Student not found");
  }
  res.status(200).json(student);
}

export async function createStudent(req, res) {
  const data = req.body;
  const studentData = CreateStudentDTO.parse(data);

  const newStudent = await studentsRepository.createStudent(studentData);
  res.status(200).json(newStudent);
}

export async function updateStudent(req, res) {
  // den får id fra det url klienten sender
  const { id } = req.params;
  const data = req.body;
  const student = UpdateStudentDTO.parse(data);
  const updated = await studentsRepository.updateStudent.apply(id, student);
  // den får de andre værdier fra det klienten skriver i JSON body'en
  if (!updated) {
    throw new HTTPError(404, "Student not found");
  }
  res.status(200).json(updated);
}

export async function deleteStudent(req, res) {
  const { id } = req.params;
  const deletedStudent = await studentsRepository.deleteStudent(id);
  if (!deletedStudent) {
    throw new HTTPError(404, "Student not found");
  }
  res.status(204).send(); // man bruger send() når man ik har noget data at sende men man stadig gerne vil sende statuskoden.
  // fx i de andre routes som updateStudent skriver jeg ikke send() men json(updateStudent) og det er fordi jeg faktisk har data der
}
