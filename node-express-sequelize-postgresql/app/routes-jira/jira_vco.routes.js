module.exports = app => {
  const view_customer_organizations = require("../controllers-jira/jira_vco.controller.js");

  var router = require("express").Router();

  // Create a new view
  router.post("/", view_customer_organizations.create);

  // Retrieve all view
  router.get("/", view_customer_organizations.findAll);

  // Retrieve a single view with id
  router.get("/:id", view_customer_organizations.findOne);

  // Update a view with id
  router.put("/:id", view_customer_organizations.update);

  // Delete a view with id
  router.delete("/:id", view_customer_organizations.delete);

  app.use("/api/v1/jira/viewco", router);
};
