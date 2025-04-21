const path = require("path");

const baseConfig = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, "src", "database", "database.db")
  },
  pool: {
    afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = on", cb)
  },
  migrations: {
    directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
  },
  useNullAsDefault: true,
};

module.exports = {
  development: baseConfig,
  production: baseConfig,
};