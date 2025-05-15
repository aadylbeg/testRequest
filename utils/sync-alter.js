const { sequelize, Price, Users, Sessions, Videos } = require("../models");

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("DB Synced");
  } catch (err) {
    console.log(err);
  }
  process.exit(1);
})();
