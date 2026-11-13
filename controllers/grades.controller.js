import * as gradesRepository from "../repositories/grades.repository.js";
import HTTPError from "../errorhandling/HTTPError.js";

export async function getAllGrades(req, res) {
  const allGrades = await gradesRepository.getAllGrades();
  res.json(allGrades);
}

export async function getSingleGrade(req, res) {
  const { id } = req.params;
  const grade = await gradesRepository.getGradeById(id);

  if (grade) {
    return res.status(200).json(grade);
  }
  throw new HTTPError(404, "Grade does not exist");
}
