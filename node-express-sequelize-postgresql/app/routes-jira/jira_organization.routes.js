module.exports = app => {
  const jira_organizations = require("../controllers-jira/jira_organization.controller.js");

  var router = require("express").Router();

  // Create a new Organization
  router.post("/", jira_organizations.create);

  // Retrieve all Organizations
  router.get("/", jira_organizations.findAll);

  // Retrieve a single Jira Organization with id
  router.get("/:id", jira_organizations.findOne);

      // Retrieve a Jira issues with id organisation
      router.get("/:id/issue", jira_organizations.findbyOrganisationId);

          // Retrieve a single Jira Organization with id
          //router.get("/:idorg/issue/:idiss/worklog", jira_organizations.findbyOrganisationIdandiss);

          // Retrieve a single Jira Organization with id
          //router.get("/:idorg/issue/:idiss", jira_organizations.findissuebyOrgId);

  // Update a Jira Organization with id
  router.put("/:id", jira_organizations.update);

  // Delete a Tutorial with id
  router.delete("/:id", jira_organizations.delete);

  // Delete all Tutorials
  router.delete("/", jira_organizations.deleteAll);

  app.use("/api/v1/jira/organization", router);
};
