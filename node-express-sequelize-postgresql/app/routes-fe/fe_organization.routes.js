module.exports = app => {
  const jira_organizations = require("../controllers-fe/fe_organization.controller.js");

  var router = require("express").Router();

  // Create a new Organization
  router.post("/", jira_organizations.create);

  // Retrieve all Organizations
  router.get("/", jira_organizations.findAll);

  // Retrieve a single Jira Organization with id
  router.get("/:id", jira_organizations.findOne);

  // Update a Jira Organization with id
  router.put("/:id", jira_organizations.update);

  // Delete a Tutorial with id
  router.delete("/:id", jira_organizations.delete);

  app.use("/api/v1/jira/organization", router);
};
