module.exports = app => {
  const jira_users = require("../controllers-jira/jira_user.controller.js");

  var router = require("express").Router();

  // Create a new User 
  router.post("/", jira_users.create);

  // Retrieve all Users 
  router.get("/", jira_users.findAll);

  // Retrive one User by id 
  router.get("/:id", jira_users.findOne);

  // Update a User with id 
  router.put("/:id", jira_users.update);

  // Delete a User with id
  router.delete("/:id", jira_users.delete);

    // Retrieves all worklogs from a user
    router.get("/:iduser/worklog", jira_users.findworklogfromuser );

    // Retrieve one worklog from a user
    router.get("/:iduser/worklog/:idwl", jira_users.findOneworklog);

  app.use("/api/v1/jira/user", router);
};
