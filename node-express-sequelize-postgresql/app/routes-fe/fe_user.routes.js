module.exports = app => {
  const jira_users = require("../controllers-fe/fe_user.controller.js");

  var router = require("express").Router();

  // Create a new User X
  router.post("/", jira_users.create);

  // Retrieve all Users V
  router.get("/", jira_users.findAll);

  // Retrive one User by id X
  router.get("/:id", jira_users.findOne);

  // Update a User with id V
  router.put("/:id", jira_users.update);

  // Delete a User with id
  router.delete("/:id", jira_users.delete);

  // Delete all Users
  //router.delete("/", jira_users.deleteAll);

  app.use("/api/v1/jira/user", router);
};
