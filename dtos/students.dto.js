import { z } from "zod";

export const CreateStudentDTO = z.object({
  student_name: z.string().min(1, "Navn skal udfyldes"),
  fk_house: z.number().optional(),
  //  det skal være et tal, et helt tal (.int), mindst 1 og højst 7
  student_year: z.number().int().min(1).max(7),
});

export const UpdateStudentDTO = CreateStudentDTO.partial();
