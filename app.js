const express = require("express");
const AppError = require("./utils/appError");
const app = express();

app.use(require("cors")());
app.use(require("body-parser").json());

app.use("/api/v1", require("./routes/requestRoutes"));

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(require("./controllers/errController"));

module.exports = app;
