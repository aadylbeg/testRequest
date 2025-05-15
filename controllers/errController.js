const sendError = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

const sqlError = (err) => {
  // const errors = Object.values(err.errors).map(el => el.message);
  const message = err.original;
  return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  console.log(err);
  sendError(err, res);
  if (err.name === "SequelizeValidationError") {
    err = sqlError(err);
  }
};
