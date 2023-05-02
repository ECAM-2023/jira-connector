module.exports = (sequelize, Sequelize) => {
  const Jira_Issue = sequelize.define("jira_issues", {/* jira_issues c'est le nom de la table ds la database */
    issue_id: {
      type: Sequelize.STRING
    },
    summary: {
      type: Sequelize.STRING
    }
  });

  return Jira_Issue;
};
