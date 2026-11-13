import * as examsRepository from "../repositories/exams.repository.js";
import HTTPError from "../errorhandling/HTTPError.js";
import { CreateExamDTO, UpdateExamDTO } from "../dtos/exams.dto.js";

export async function getAllExams(req, res) {
  const exams = await examsRepository.getAllExams();
  res.json(exams);
}

export async function getSingleExam(req, res) {
  const { id } = req.params;
  const exam = await examsRepository.getExamById(id);
  if (!exam) {
    throw new HTTPError(404, "Exam not found");
  }
  res.status(200).json(exam);
}

export async function createExam(req, res) {
  const data = req.body;
  const examData = CreateExamDTO.parse(data);
  const newExam = await examsRepository.createExam(examData);
  res.status(201).json(newExam);
}

export async function updateExam(req, res) {
  const { id } = req.params;
  const data = req.body;
  const exam = UpdateExamDTO.parse(data);
  const updated = await examsRepository.updateExam(id, exam);
  if (!updated) {
    throw new HTTPError(404, "Exam not found");
  }
  res.json(updated);
}

export async function deleteExam(req, res) {
  const { id } = req.params;
  const deleted = await examsRepository.deleteExam(id);
  if (!deleted) {
    throw new HTTPError(404, "Exam not found");
  }
  res.status(204).send();
}
