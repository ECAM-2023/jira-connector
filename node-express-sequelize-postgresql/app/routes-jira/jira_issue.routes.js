module.exports = app => {
  const jira_issue = require("../controllers-jira/jira_issue.controller.js");
  const jira_worklog = require("../controllers-jira/jira_worklog.controller.js");

  var router = require("express").Router();

  // Create a new Issue
  router.post("/", jira_issue.create);

  // Retrieve all Issues
  router.get("/", jira_issue.findAll);

  // Retrieve a single Jira Issue with id
  router.get("/:id", jira_issue.findOne);

  // Update a Jira Issue with id
  router.put("/:id", jira_issue.update);

  // Delete a Issue with id
  router.delete("/:id", jira_issue.delete);

  // Retrieve all worklogs
  router.get("/worklog", jira_worklog.findAll);

  // Create a new worklogs
  router.post("/worklog", jira_worklog.create);

  // Retrieve a single Jira worklogs with id
  router.get("/worklog/:id", jira_worklog.findworklogs);

  // Update a Jira worklogs with id
  router.put("/worklog/:id", jira_worklog.update);

  // Delete a worklogs with id
  router.delete("/worklog/:id", jira_worklog.delete);

  app.use("/api/v1/jira/issue", router);
};
