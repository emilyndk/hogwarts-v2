import express from "express";
import * as teachersController from "../controllers/teachers.controller.js";

const router = express.Router();

// den ved at det er teachers da jeg i server.js har skrevet app.use("/teachers" , teachersRouter)

router.get("/", teachersController.getAllTeachers);
router.get("/:id", teachersController.getSingleTeacher);
router.post("/", teachersController.createTeacher);
router.put("/:id", teachersController.updateTeacher);
router.delete("/:id", teachersController.deleteTeacher);

export default router;
