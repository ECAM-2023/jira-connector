module.exports = app => {
  const jira_customers = require("../controllers-jira/jira_customer.controller.js");

  var router = require("express").Router();

  // Create a new customer X
  router.post("/", jira_customers.create);

  // Retrieve all customers V
  router.get("/", jira_customers.findAll);

  // Retrive one customer by id X
  router.get("/:id", jira_customers.findOne);

  // Update a customer with id V
  router.put("/:id", jira_customers.update);

  // Delete a customer with id
  router.delete("/:id", jira_customers.delete);

  // Delete all customers
  router.delete("/", jira_customers.deleteAll);

  app.use("/api/v1/jira/customer", router);
};
