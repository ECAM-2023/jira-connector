module.exports = app => {
  const jira_users = require("../controllers/jira_user.controller.js");

  var router = require("express").Router();

  // Create a new User
  router.post("/", jira_users.create);

  // Retrieve all Users
  router.get("/", jira_users.findAll);

  // Retrive one User by id
  router.get("/:id", jira_users.findOne);

  // Update a User with id
  router.put("/:id", jira_users.update);

  app.use("/api/v1/jira", router);
};
