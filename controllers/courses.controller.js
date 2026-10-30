import * as coursesRepository from "../repositories/courses.repository.js";

export async function getAllCourses(req, res) {
  try {
    const courses = await coursesRepository.getAllCourses();
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke hente courses" });
  }
}

export async function getSingleCourse(req, res) {
  try {
    const { id } = req.params;
    const course = await coursesRepository.getCourseById(id);
    if (!course) {
      return res.status(404).json({ error: "Course ikke fundet" });
    }
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke hente course" });
  }
}

export async function createCourse(req, res) {
  try {
    const { course_name, fk_teachers } = req.body;
    const newCourse = await coursesRepository.createCourse(
      course_name,
      fk_teachers,
    );
    res.status(201).json(newCourse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke oprette course" });
  }
}

export async function updateCourse(req, res) {
  try {
    const { id } = req.params;
    const { course_name, fk_teachers } = req.body;
    const updatedCourse = await coursesRepository.updateCourse(
      id,
      course_name,
      fk_teachers,
    );
    if (!updatedCourse) {
      return res.status(404).json({ error: "Kunne ikke opdatere course" });
    }
    res.json(updatedCourse);
  } catch (err) {
    res.status(500).json({ error: "Kunne ikke opdatere course" });
  }
}

export async function updateCourseTeacher(req, res) {
  try {
    const { id } = req.params;
    const { fk_teachers } = req.body;
    const updated = await coursesRepository.updateCourseTeacher(
      id,
      fk_teachers,
    );
    if (!updated) {
      return res.status(404).json({ error: "Course ikke fundet" });
    }
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke opdatere teacher på course" });
  }
}

export async function addStudentToCourse(req, res) {
  try {
    const { id } = req.params;
    const { student_id } = req.body;
    await coursesRepository.addStudentToCourse(id, student_id);
    res.status(201).json({ message: "Student tilføjet til course" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke tilføje student til course" });
  }
}

export async function removeStudentFromCourse(req, res) {
  try {
    // den henter både id og studentId fra URL da man ikke skriver student_id som JSON body i en DELETE request ligesom man gjorde i PUT requesten
    const { id, studentId } = req.params;
    const removed = await coursesRepository.removeStudentFromCourse(
      id,
      studentId,
    );
    if (!removed) {
      return res
        .status(404)
        .json({ error: "Student var ikke tilmeldt dette course" });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke fjerne student fra course" });
  }
}

export async function deleteCourse(req, res) {
  try {
    const { id } = req.params;
    const deleted = await coursesRepository.deleteCourse(id);
    if (!deleted) {
      return res.status(404).json({ error: "Course ikke fundet" });
    }
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Kunne ikke slette course" });
  }
}
