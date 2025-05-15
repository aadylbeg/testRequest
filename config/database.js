const { Sequelize } = require("sequelize");
const { Umzug, SequelizeStorage } = require("umzug");
const config = require("./config")["development"];

const sequelize = new Sequelize({
  dialect: "postgres",
  host: config.host,
  database: config.database,
  username: config.username,
  password: config.password,
});

const runMigrations = async () => {
  const umzug = new Umzug({
    migrations: { glob: "./migrations/request.js" },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
  });

  await umzug.up();
};

module.exports = { runMigrations };
