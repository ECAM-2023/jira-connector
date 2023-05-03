// jira_User = require("./jira_user.model.js")
// jira_organization = require("./jira_organization.model.js")

module.exports = (sequelize, Sequelize) => {
  const Jira_Issue = sequelize.define("jira_issues", {/* jira_issues c'est le nom de la table ds la database */
    issue_id: {
      type: Sequelize.STRING
    },
    key: {
      type: Sequelize.STRING
    },
    nameIssueType: {
      type: Sequelize.STRING
    },
    timespent: {
      type: Sequelize.STRING
    },
    updated : {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    },
    summary: {
      type: Sequelize.STRING
    },
    user: {
      type: Sequelize.STRING
    },
    organization: {
      type: Sequelize.STRING
    }
  });

  return Jira_Issue;
};
