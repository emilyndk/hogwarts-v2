// errorhandleren er en middleware. hver gang der throwes en error, griber den den og modtager fejlen som err og læser pakkens indhold (err.statusCode og err.message)
// og sender et json svar tilbage til klienten

export default (err, req, res, next) => {
  //  console.log(err.message);
  //  console.log(err.statusCode);

  let error = "internal server error";

  let message = err.message || "Something went wrong";
  const statusCode = err.statusCode || 500;

  if (statusCode == 404) {
    error = "not found";
  } else if (statusCode == 400) {
    error = "bad request";
  }
  res.status(statusCode).json({
    message: err.message,
    error: error,
    statusCode: statusCode,
  });
};
