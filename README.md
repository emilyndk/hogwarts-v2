# Hogwarts Course Management System del II

## Endpoints

Test endpointsne ved at bruge Bruno eller Insomnia

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
