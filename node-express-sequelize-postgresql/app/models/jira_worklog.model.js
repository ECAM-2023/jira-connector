
module.exports = (sequelize, Sequelize) => {
  const Jira_worklog = sequelize.define("jira_worklog", {/* jira_worklog c'est le nom de la table ds la database */
    worklog_id: {
      type: Sequelize.STRING
    },
    issue_id: {
      type: Sequelize.STRING
    },
    creatorId: {
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
    }
  });
 
  return Jira_worklog;
};
