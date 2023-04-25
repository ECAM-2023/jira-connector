module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "database20",
  DB: "node-express-sequelize",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
