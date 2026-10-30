import express from "express";
import * as coursesController from "../controllers/courses.controller.js";

const router = express.Router();

router.get("/", coursesController.getAllCourses);
router.get("/:id", coursesController.getSingleCourse);
router.post("/", coursesController.createCourse);
router.put("/:id/teacher", coursesController.updateCourseTeacher);
router.put("/:id", coursesController.updateCourse);

// jeg skriver ikke :studentId i URL'en fordi jeg ikke har brug for at vide hvilket studentId der skal tilføjes, det er nok at vide hvilket courseId der skal tilføjes en student til. Jeg sender studentId som JSON i body'en i POST requesten. det handler om http metoden. havde det været en DELETE request havde jeg skrevet :studentId i URL'en da man ikke skriver data i body'en i en DELETE request
router.post("/:id/students", coursesController.addStudentToCourse);
router.delete(
  "/:id/students/:studentId",
  coursesController.removeStudentFromCourse,
);
router.delete("/:id", coursesController.deleteCourse);

export default router;
