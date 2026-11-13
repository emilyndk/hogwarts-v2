import { z } from "zod";

export const CreateExamDTO = z.object({
  course_id: z.number().int(),
  student_id: z.number().int(),
  grade_id: z.number().int(),
});

export const UpdateExamDTO = CreateExamDTO.partial();
