import { z } from "zod";

// siden jeg både gerne vil have partial() når jeg definerer UpdateCourseDTO baseret på CreateCourseDTO (denne linje: export const UpdateCourseDTO = CreateCourseDTO.partial();)
// fordi partial gør at når jeg opdaterer et course behvøver jeg ik at udfylde alle felter. så i
// den linje siger jeg at UpdateCourseDTO skal være det samme som CreateCourseDTO den eneste forskel er at UpdateCourseDTO skal være partial()
// og refine() inde i CreateCourseDTo så jeg kan sørge for hogwarts reglerne (regel 1: hvis det er 6. eller 7. år må courset ikke være OWL, regel 2: hvis det er 1. til 5. år må courset ikke være NEWT)
// men jeg må ikke have både partial og refine ifølge zod for så giver den fejl,
// så vil jeg lave en base som jeg baserer CreateCourseDTO og UpdateCourseDTO på, sådan kan jeg adskille partial og refine og dermed kun have partial på UpdateCourseDTO og kun have refine på CreateCourseDTO

//jeg laver et base schema

const courseSchema = z.object({
  course_name: z.string().min(1, "Navn skal udfyldes"),
  fk_teachers: z.number().int().positive().optional(),
  type: z.enum(["core", "elective", "extra-curricular"], {
    message: "Typen skal være enten core, elective eller extra-curricular",
  }),
  level: z.enum(["OWL", "NEWT"]),
  school_year: z.number().int().min(1).max(7),
});

// jeg laver CreateCourseDTO baseret på base schemaet courseSchema
// jeg bruger .refine() til at sørge for disse regler
// regel 1: hvis det er 6. eller 7. år må courset ikke være OWL
// regel 2: hvis det er 1. til 5. år må courset ikke være NEWT

export const CreateCourseDTO = courseSchema.refine(
  (data) => {
    // regel 1
    if (
      (data.school_year === 6 || data.school_year === 7) &&
      data.level === "OWL"
    ) {
      return false;
    }
    // regel 2
    if (data.school_year <= 5 && data.level === "NEWT") {
      return false;
    }
    return true;
  },
  {
    message: "Invalid combination of school year and level in Hogwarts!",
  },
);

// jeg laver UpdateCourseDTO baseret på base schemaet courseSchema
// jeg bruger .partial() så felterne bliver valgfrie, så behøver man ik udfylde alle felterne når man kun vil opdatere 1 felt
// jeg bruger også .refine() da den stadig skal tjekke reglerne. den tjekker kun reglen, hvis BÅDE school_year og level er sendt med i opdateringen
export const UpdateCourseDTO = courseSchema.partial().refine(
  (data) => {
    // tjekker om både school_year OG level ikke er defined, altså den tjekker at de er udfyldte
    if (data.school_year !== undefined && data.level !== undefined) {
      if (
        // hvis de ER udfyldte, så sker følgende kode. den tjekker reglen ligesom i CreateCourseDTO
        (data.school_year === 6 || data.school_year === 7) &&
        data.level === "OWL"
      ) {
        return false;
      }
      if (data.school_year <= 5 && data.level === "NEWT") {
        return false;
      }
    }
    return true;
  },
  {
    message: "Invalid combination of school year and level in Hogwarts!",
  },
);

// .pick() betyder at den skal tage denne DTO men vælg kun dette ene felt ud altså fk_teachers. Det er godt til updateCourseTeacher fordi man kun skal sende fk_teachers
export const UpdateCourseTeacherDTO = courseSchema.pick({
  fk_teachers: true, // Zod tjekker at fk_teachers er et gyldigt heltal og ignorerer alt andet
});

export const AddStudentDTO = z.object({
  student_id: z.number().int().positive("Student ID skal være et gyldigt tal"),
});

// UDKOMMENTERET OPRINDELIG KODE SOM GAV FEJL I TERMINALEN FORDI JEG BÅDE HAVDE PARITAL OG REFINE:

// export const CreateCourseDTO = z
//   .object({
//     course_name: z.string().min(1, "Navn skal udfyldes"),

//     fk_teachers: z.number().int().positive().optional(),

//     type: z.enum(["core", "elective", "extra-curricular"]),

//     level: z.enum(["OWL", "NEWT"]),

//     school_year: z.number().int().min(1).max(7),
//   })
//   .refine((data) => {
//     // regel: hvis det er 6. eller 7. år må courset ikke være OWL
//     if (
//       (data.school_year === 6 || data.school_year === 7) &&
//       data.level === "OWL"
//     ) {
//       return false;
//     }
//     //regel: hvis det er 1. til 5. år må courset ikke være NEWT
//     if (data.school_year <= 5 && data.level === "NEWT") {
//       return false;
//     }
//     return true;
//   });

// .partial() sørger for, at UpdateCourseDTO automatisk gør alle ovenstående felter valgfrie
// export const UpdateCourseDTO = CreateCourseDTO.partial();

// // .pick() betyder at den skal tage denne DTO men vælg kun dette ene felt ud altså fk_teachers. Det er godt til updateCourseTeacher fordi man kun skal sende fk_teachers
// export const UpdateCourseTeacherDTO = CreateCourseDTO.pick({
//   fk_teachers: true, // Zod tjekker at fk_teachers er et gyldigt heltal og ignorerer alt andet
// });

// export const AddStudentDTO = z.object({
//   student_id: z.number().int().positive("Student ID skal være et gyldigt tal"),
// });
