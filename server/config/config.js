module.exports = {
  development: {
    username: process.env.DB_USER,
    password: null,
    database: process.env.DB_NAME,
    host: "127.0.0.1",
    dialect: "postgres"
  },

  test: {
    use_env_variable: "testDb",
    dialect: "postgres",
    logging: false
  },

  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres"
  }
};
