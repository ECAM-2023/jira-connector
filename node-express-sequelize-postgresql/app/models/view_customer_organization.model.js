module.exports = (sequelize, Sequelize) => {
  const View_Customer_Organization = sequelize.define("view_customer_organization", {/* jira_user c'est le nom de la table ds la database */
    accountId: {
      type: Sequelize.STRING
    },
    organizationID: {
      type: Sequelize.STRING
    }
  });

  return View_Customer_Organization;
};
