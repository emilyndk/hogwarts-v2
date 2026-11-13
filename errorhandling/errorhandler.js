// errorhandleren er en middleware. hver gang der throwes en error, griber den den og modtager fejlen som err og læser pakkens indhold (err.statusCode og err.message)
// og sender et json svar tilbage til klienten

import { ZodError } from "zod";

export default (err, req, res, next) => {
  let error = "internal server error";
  let message = err.message || "Something went wrong";
  let statusCode = err.statusCode || 500;

  // Hvis fejlen kommer fra Zod
  if (err instanceof ZodError) {
    statusCode = 400;
    error = "bad request";
    message = err.issues.map((e) => e.message).join(", ");
  } else {
    // Almindelig fejl-håndtering
    if (statusCode == 404) {
      error = "not found";
    } else if (statusCode == 400) {
      error = "bad request";
    }
  }

  res.status(statusCode).json({
    message: message,
    error: error,
    statusCode: statusCode,
  });
};
