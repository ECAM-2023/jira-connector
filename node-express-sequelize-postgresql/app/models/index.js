const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
      

      
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.jira_users = require("./jira_user.model.js")(sequelize, Sequelize);
db.jira_customers = require("./jira_customer.model.js")(sequelize, Sequelize);
db.jira_organisations = require("./jira_organization.model.js")(sequelize, Sequelize);
db.view_customer_organizations = require("./view_customer_organization.model.js")(sequelize, Sequelize);
db.jira_issues = require("./jira_issue.model.js")(sequelize, Sequelize);
db.login = require("./user_login.model.js")(sequelize, Sequelize);
module.exports = db;
