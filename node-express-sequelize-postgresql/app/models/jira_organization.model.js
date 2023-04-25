module.exports = (sequelize, Sequelize) => {
  const Jira_Organization = sequelize.define("jira_organization", {/* jira_user c'est le nom de la table ds la database */
    organizationID: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    }
  });

  return Jira_Organization;
};
