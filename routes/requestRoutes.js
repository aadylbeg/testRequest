const express = require("express");
const app = express();
const request = require("../controllers/requestControllers");

app.get("/requests", request.getAllRequests);
app.get("/requests/:id", request.getRequest);
app.post("/requests", request.createRequest);
app.put("/requests/:id", request.editRequest);
app.put("/requests/cancel", request.cancelAllInProcess);
app.delete("/requests/:id", request.deleteRequest);

module.exports = app;
