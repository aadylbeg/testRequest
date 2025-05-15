require("dotenv").config({ path: "./config.env" });
const { sequelize } = require("./models");
const { runMigrations } = require("./config/database");
const { Client } = require("pg");
const config = require("./config/config")["development"];

async function createDatabaseIfNotExists() {
  const client = new Client({
    host: config.host,
    user: config.username,
    password: config.password,
    database: "postgres",
  });

  await client.connect();

  const dbCheckQuery = `SELECT 1 FROM pg_database WHERE datname = '${config.database}';`;
  const dbCreateQuery = `CREATE DATABASE "${config.database}";`;

  const result = await client.query(dbCheckQuery);

  if (result.rowCount === 0) {
    await client.query(dbCreateQuery);
    console.log(`Database "${config.database}" created.`);
  } else {
    console.log(`Database "${config.database}" already exists.`);
  }

  await client.end();
}

const server = require("./app").listen(process.env.PORT, async () => {
  // await createDatabaseIfNotExists();
  await sequelize.authenticate();
  // await runMigrations();
  console.log(`Connected to DB and listenning on port: ${process.env.PORT}..`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
