import express from "express";
import * as examsController from "../controllers/exams.controller.js";

const router = express.Router();

router.get("/", examsController.getAllExams);
router.get("/:id", examsController.getSingleExam);
router.post("/", examsController.createExam);
router.put("/:id", examsController.updateExam);
router.delete("/:id", examsController.deleteExam);

export default router;
