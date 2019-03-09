module.exports = {
  development: {
    username: "andeladeveloper",
    password: null,
    database: "sms_manager",
    host: "127.0.0.1",
    dialect: "postgres"
  },

  test: {
    use_env_variable: "dmsTest",
    dialect: "postgres",
    logging: false
  },

  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres"
  }
};
