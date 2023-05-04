module.exports = app => {
  const jira_issue = require("../controllers-jira/jira_issue.controller.js");

  var router = require("express").Router();

  // Create a new Organization
  router.post("/", jira_issue.create);

  // Retrieve all Organizations
  router.get("/", jira_issue.findAll);

  // Retrieve a single Jira Organization with id
  router.get("/:id", jira_issue.findOne);

  // Update a Jira Organization with id
  router.put("/:id", jira_issue.update);

  // Delete a Tutorial with id
  router.delete("/:id", jira_issue.delete);

  // Delete all Tutorials
  router.delete("/", jira_issue.deleteAll);

  app.use("/api/v1/jira/issue", router);
};
