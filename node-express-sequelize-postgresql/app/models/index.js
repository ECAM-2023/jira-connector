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

const Post = sequelize.define('Post', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false
  }
});

// sequelize.query(`
//   CREATE TRIGGER update_posts_updated_at
//   BEFORE INSERT ON "jira_users"
//   FOR EACH ROW
//   EXECUTE PROCEDURE update_posts_updated_at()
// `);

// Utilisation de la classe Post
const post = Post.create({
  title: 'Mon titre',
  content: 'Mon contenu'
});
console.log(post);

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
db.jira_worklog = require("./jira_worklog.model.js")(sequelize, Sequelize);

module.exports = db;
