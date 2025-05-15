const { Requests, sequelize } = require("../models");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { Op } = require("sequelize");

exports.getAllRequests = catchAsync(async (req, res) => {
  let { size, page, sortBy, as, keyword, status, date, startDate, endDate } =
      req.query,
    where = {},
    order = [["id", "desc"]],
    limit = parseInt(size) ? parseInt(size) : 10,
    offset = (page - 1) * limit || 0;

  if (keyword) {
    where[Op.or] = [
      { title: { [Op.iLike]: `%${keyword}%` } },
      { description: { [Op.iLike]: `%${keyword}%` } },
    ];
  }
  if (status) where.status = status;
  if (date) where.createdAt = { [Op.eq]: new Date(date) };

  if (startDate && endDate) {
    where.createdAt = {
      [Op.between]: [new Date(startDate), new Date(endDate)],
    };
  }

  if (sortBy && as) order = [[sortBy, as]];

  const requests = await Requests.findAll({ where, order, limit, offset });
  const total = await Requests.count({ where });

  return res.status(200).send({ data: requests, total });
});

exports.getRequest = catchAsync(async (req, res, next) => {
  const request = await Requests.findOne({ where: { id: req.params.id } });
  if (!request) return next(new AppError("Not found", 404));

  return res.status(200).send(request);
});

exports.createRequest = catchAsync(async (req, res, next) => {
  const { title, description } = req.body;
  const request = await Requests.create({
    status: "CREATED",
    title,
    description,
  });

  return res.status(200).send(request);
});

exports.editRequest = catchAsync(async (req, res, next) => {
  const request = await Requests.findOne({ where: { id: req.params.id } });
  if (!request) return next(new AppError("Not found", 404));

  const { status, title, description, solution, ignoreReason } = req.body;
  await request.update({ status, title, description, solution, ignoreReason });

  return res.status(200).send(request);
});

exports.cancelAllInProcess = catchAsync(async (req, res, next) => {
  const requests = await Requests.findAll({ where: { status: "PROCESS" } });

  for (var request of requests) await request.update({ status: "CANCELED" });

  return res.status(200).send({ message: "success" });
});

exports.deleteRequest = catchAsync(async (req, res, next) => {
  const request = await Requests.findOne({ where: { id: req.params.id } });
  if (!request) return next(new AppError("Not found", 404));

  await request.destroy();
  return res.status(204).send();
});
