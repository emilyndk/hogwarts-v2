# Hogwarts Course Management System del II

## Endpoints

Test endpointsne ved at bruge Bruno eller Insomnia. Vælg et endpoint, fx GET /teachers og tryk send for at se listen af data
For at teste POST / PUT-endpoints: Gå ind under fanen Body, derefter vælg JSON, og skriv fx {"teacher_name": "Severus Snape", "fk_house": 1}. Tryk send
Ved ruter der kræver et ID f.eks. GET /teachers/:id eller PUT /courses/:id/teacher, erstat :id i stien med et rigtigt ID fra databasen (f.eks. http://localhost:3002/teachers/1).

### Houses

- GET /houses - henter alle houses
- GET /houses/:id - henter et specifikt house
- POST /houses/ - opret et nyt house

### Teachers

- GET /teachers - henter alle teacher
- GET /teachers/:id - henter en specifik teacher
- POST /teachers/ - opret en ny teacher
- PUT /teachers/:id - opdaterer en teacher
- DELETE /teachers/:id - sletter en teacher

### Students

- GET /students - henter alle students
- GET /students/:id - henter en specifik student
- POST /students/ - opret en ny student
- PUT /students/:id - opdaterer en student
- DELETE /students/:id - sletter en student

### Courses

- GET /courses - henter alle students
- GET /courses/:id - henter et specifikt courses
- POST /courses/ - opret et nyt course
- PUT /courses/:id - opdaterer et course
- PUT /courses/:id/teacher - opdaterer et course's teacher
- DELETE /courses/:id - sletter et course
- DELETE /courses/:id/students/:studentId - sletter en student fra et course
- POST /courses/:id/students/ - tilføj en student til et course
