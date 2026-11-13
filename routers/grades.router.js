import express from "express";
import * as gradesController from "../controllers/grades.controller.js";

const router = express.Router();

router.get("/", gradesController.getAllGrades);
router.get("/:id", gradesController.getSingleGrade);

export default router;
