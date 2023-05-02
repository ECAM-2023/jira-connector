module.exports = app => {
  const view_customer_organizations = require("../controllers-fe/fe_vco.controller.js");

  var router = require("express").Router();

  // Create a new Organization
  router.post("/", view_customer_organizations.create);

  // Retrieve all Organizations
  router.get("/", view_customer_organizations.findAll);

  // // Retrieve all published Tutorials
  // router.get("/published", jira.findAllPublished);

  // Retrieve a single Jira Organization with id
  router.get("/:id", view_customer_organizations.findOne);

  // Update a Jira Organization with id
  router.put("/:id", view_customer_organizations.update);

  // Delete a Tutorial with id
  router.delete("/:id", view_customer_organizations.delete);

  // Delete all Tutorials
  router.delete("/", view_customer_organizations.deleteAll);

  app.use("/api/v1/jira/viewco", router);
};
