# Pseudokode for hvert endpoint

## Houses

# GET /houses

1. Klienten laver en GET-request, som housesRouter fanger og sender til housesController
2. Controlleren laver en variabel allHouses hvori den kører funktionen getAllHouses (som den får fra houses.repository.js).
3. Repository kører funktionen og via SQL ("SELECT \* FROM houses WHERE id = $1") henter den alle rækker
4. Controlleren sender resultatet tilbage
5. Hvis der er fejl i try, sender den statuskode 500 og beskeden "Kunne ikke hente houses"

# GET /houses/:id

1. Klienten laver en GET-request, som housesRouter fanger og sender til housesController
2. Controller henter id fra URL'en klienten sendte og gemmer det i en const variabel som sendes til repository
3. Controller laver en variabel house hvori den kører funktionen getHouseById (som den får fra houses.repository.js).
4. Repository kører funktionen og via SQL "SELECT \* FROM houses WHERE id = $1"
5. Hvis der er fejl i try, sender den statuskode 500 og beskeden "Kunne ikke hente house"

## Teachers

# GET /teachers

1. Klienten laver en GET-request, som teachersRouter fanger og sender videre til teachersController.
2. teachersController siger til teachersRepository at den skal hente alle rækker fra teachers tabellen i databasen.
3. teachersRepository henter dataen fra databasen via SQL og giver den tilbage til teachersController, som sender det tilbage til klienten som JSON
4. Hvis der er fejl i try, sender den statuskode 500 og beskeden "Kunne ikke hente teachers"

# GET /teachers/:id

1. Klienten laver en GET-request, som teachersRouter fanger og sender videre til teachersController.
2. teachersController laver en variabel id hvor den trækker værdien af id ud fra URL'en i requesten.
3. laver en variabel teacher som indeholder data for den teacher der matcher id'et ved at bruge getTeacherById funktionen fra teachers.repository.js filen til at hente teacheren med det id.
4. Controlleren tjekker om teacheren med det id findes og hvis den ikke gør sendes der en statuskode 404 og beskeden "Teacher ikke fundet". Hvis den eksisterer sender controller resultatet tilbage i form af JSON
5. Hvis der opstår fejl i try, sender den statuskode 500 tilbage og beskeden "Kunne ikke hente teacher"

# POST /teachers/

1. Klienten laver en POST-request i form af JSON body med data for hver kolonne, som teachersRouter fanger og sender videre til teachersController
2. teachersController trækker teacher_name og fk_house værdierne ud fra req.body.
3. teachersController giver værdierne altså navnet og hus id på den nye teacher til teachersRepository
4. teachersRepository indsætter den nye række ind i databasen via SQL med en INSERT kommando, derefter sender den nye række tilbage til controller
5. Controlleren gemmer den nye række i newTeacher og sender det tilbage til klienten i JSON format

# PUT /teachers/:id

1. Klienten laver en PUT-request, som routeren fanger og sender videre til controlleren.
2. Controller henter id fra URL'en klienten sendte
3. Så henter den teacher_name og fk_house fra JSON body'en klienten også sendte den opdaterede data
4. Controller laver en variabel updated og putter værdierne herind og kører updateTeacher fra teachers.repository.js som opdaterer den relevante række i databasen med SQL ("UPDATE teachers SET teacher_name = $1, fk_house = $2 WHERE id = $3...)
5. Controlleren tjekker om teacheren med de nye værdier eksisterer (!updated) og hvis ikke returnerer den statuskode 404 med beskeden "Teacher ikke fundet". Hvis den eksisterer sender den den nye teachers data i JSON format. Hvis der er fejl i tryblokken sender den statuskode 500 med beskeden "Kunne ikke opdatere teacher"

# DELETE /teachers/:id

1. Klienten laver en DELETE-request, som routeren fanger og sender videre til controlleren.
2. Controlleren henter id'et fra URL'en klienten sendte.
3. Controlleren laver en variabel deleted som har værdien af den teacher hvis id matcher det id den lige har hentet fra URLen. Hvis denne teacher ikke findes (!deleted) sendes en statuskode 404 tilbage med beskeden "Teacher ikke fundet". Hvis den findes, sender den statuskode 204 og den slettes.

## Students

Students' endpoints følger det samme mønster som Teachers ovenfor, bare med students tabellen

## Courses

# GET /courses

Courses' endpoints GET /courses/, GET /courses/:id, PUT /courses/:id og DELETE /courses/:id fungerer på samme måde som teachers og students, men da der er en many-to-many relation mellem students og courses, fordi students kan være tilmeldt flere courses og courses kan have flere students, har jeg lavet et junction table course_students. Derfor har courses 2 ekstra endpoints med HTTP metoderne POST og DELETE, da man skal kunne tilføje en student til et course (POST) samt fjerne en student fra et course (DELETE). Jeg har også lavet et ekstra PUT endpoint til at opdatere teacher

## PUT /courses/:id/teacher

1. Klienten laveer en PUT-request og routeren fanger den og sender den videre til controlleren
2. Controlleren henter coursets id fra URL'en og teachers id fra der hvor klienten har skrevet det nye teacher id i JSON body
3. Controlleren laver en variabel updated hvori den kører funktionen updateCourseteacher og giver repositoryet værdierne i id og fk_teachers
4. Repository bruger de værdier den lige har fået fra controlleren og funktionen køres, så via SQl opdaterer den databasen ("UPDATE courses SET fk_teachers = $1 WHERE id = $2 RETURNI..."). Den returnerer det første array i rows hvilket er den opdaterede række.
5. Controlleren tjekker om den opdaterede række eksisterer, den tjekker om den har de opdaterede data. Hvis den ikke eksisterer eller ikke har det opdaterede data sender den 404 tilbage og "Course ikke fundet". Hvis den eksisterer med de opdaterede data returnerer den resultatet tilbage til klienten i JSON format

## POST /courses/:id/students

1. Klienten laver en POST-request og routeren fanger den og sender den videre til controlleren
2. Controlleren henter coursets id fra URL og derefter student_id fra JSON body hvor klienten har skrevet fx {"student_id": 1}
3. Controlleren kører funktionen addStudentToCourse som ligger i repository filen samt giver den de værdier (await coursesRepository.addStudentToCourse(id, student_id);=) repository skal vide for at køre funktionen
4. Controlleren returnerer status 201 og en JSON format besked "Student tilføjet til course"
5. Hvis noget gik galt giver den status 500 og "Kunne ikke tilføje student til course"

## DELETE /courses/:id/students/:id

1. Klienten laver en DELETE-request og routeren fanger den og sender den videre til controlleren
2. Controlleren henter både coursets id og studentId fra URL'en klienten skrev, fx DELETE http://localhost:3002/courses/1/students/1
3. Controlleren opretter en variabel removed hvori den kører funktionen removeStudentFromCourse som jeg har oprettet i repository filen, samt giver repository de rigtige værdier til dens parametre id og studentId så repository ved hvilken student der skal fjernes fra hvilket course
4. Controlleren tjekker om rækken faktisk eksisterede i databasen ved at tjekke if (!removed). Hvis den ikke blev fundet fordi student aldrig var tilmeldt dette course, sender den 404 tilbage med en JSON-besked: "Student var ikke tilmeldt dette course".
5. Hvis sletningen lykkedes, sender controlleren status 204 tilbage til klienten
