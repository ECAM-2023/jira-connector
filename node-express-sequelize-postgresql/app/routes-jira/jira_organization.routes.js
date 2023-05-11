module.exports = app => {
  const jira_organizations = require("../controllers-jira/jira_organization.controller.js");

  var router = require("express").Router();

  // Create a new Organization
  router.post("/", jira_organizations.create);

  // Retrieve all Organizations
  router.get("/", jira_organizations.findAll);

  // Retrieve a single Jira Organization with id
  router.get("/:id", jira_organizations.findOne);

  // Update a Jira Organization with id
  router.put("/:id", jira_organizations.update);

  // Delete a Organization with id
  router.delete("/:id", jira_organizations.delete);

      // Retrieve all Jira issues with id organisation
      router.get("/:id/issue", jira_organizations.findbyOrganisationId);

        // Retrieve a single Jira issue with id organisation
        router.get("/:idorg/issue/:idiss", jira_organizations.findissuebyOrgId);

          // Retrieves all worklogs from an issue in an organisation
          router.get("/:idorg/issue/:idiss/worklog", jira_organizations.findworkloginissue);

            // Retrieves one worklog from an issue in an organisation
            router.get("/:idorg/issue/:id/worklog/:idwl", jira_organizations.findOneworklog);
            
  app.use("/api/v1/jira/organization", router);
};
