import { z } from "zod";

export const teacherSchema = z.object({
  teacher_name: z.string().min(1, "Navn skal udfyldes"),
  fk_house: z.number().optional(),
  employment_start: z.string().min(1, "Startdato skal udfyldes"),
  currently_active: z.boolean(),
  deceased: z.boolean(),
});

export const CreateTeacherDTO = teacherSchema.refine(
  (data) => {
    // Hvis lærerne er markeret som aktive må startdatoen ikke være i fremtiden
    if (data.currently_active === true) {
      // en dato i JSON er bare en normal string fx "13-11-2026" Den ved ikke af sig selv, at en tekststreng er en dato. Hvis man prøver at sammenligne to tekststrenge direkte, ved JavaScript ikke, hvad der er "før" eller "efter"
      // Derfor bruger man new Date() til at omdanne teksten til et rigtigt tids-objekt, som computeren kan regne på

      // jeg tager den string som brugeren har sat ind i bruno fx "13-11-2026" og propper den ind i new Date()
      // resultatet er at javascript laver den om til et officielt dato-objekt. det objekt gemmer jeg i variablen startDate
      const startDate = new Date(data.employment_start);
      // når man ikke sender noget inde i paranteserne og lader () være tom som jeg har gjort her, så siger jeg til javascriot "giv mig den dato og klokkeslæt det er lige nu idag"
      const today = new Date();

      // Hvis startdatoen er større (altså senere) end i dag, er det ugyldigt
      if (startDate > today) {
        return false;
      }
    }
    return true;
  },
  {
    message: "En underviser kan ikke være aktiv før vedkommende er startet!",
  },
);

// .partial() gør automatisk alle felter ovenfor valgfrie. det ik altid man vil opdatere alle felter jo, nogle gange vil man gerne bare opdatere 1 felt
export const UpdateTeacherDTO = teacherSchema.partial();
