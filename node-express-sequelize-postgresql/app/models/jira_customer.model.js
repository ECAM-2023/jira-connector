module.exports = (sequelize, Sequelize) => {
    // "jira_user" = le nom de notre table dans la base de donnée
    const Jira_customer = sequelize.define("jira_customer", {
      accountId: {
        type: Sequelize.STRING
      },
      accountType: {
        type: Sequelize.STRING
      },
      emailAddress: {
        type: Sequelize.STRING
      },
      displayName: {
        type: Sequelize.STRING
      }
    });
  
    return Jira_customer;
  };