import express from "express";
import * as coursesController from "../controllers/courses.controller.js";

const router = express.Router();

router.get("/", coursesController.getAllCourses);
router.get("/:id", coursesController.getSingleCourse);
router.post("/", coursesController.createCourse);
router.put("/:id/teacher", coursesController.updateCourseTeacher);
router.post("/:id/students", coursesController.addStudentToCourse);
router.delete(
  "/:id/students/:studentId",
  coursesController.removeStudentFromCourse,
);
router.delete("/:id", coursesController.deleteCourse);

export default router;
