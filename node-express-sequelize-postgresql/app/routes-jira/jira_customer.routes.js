module.exports = app => {
  const jira_customers = require("../controllers-jira/jira_customer.controller.js");

  var router = require("express").Router();

  // Create a new customer 
  router.post("/", jira_customers.create);

  // Retrieve all customers 
  router.get("/", jira_customers.findAll);

  // Retrive one customer by id 
  router.get("/:id", jira_customers.findOne);

  // Update a customer with id 
  router.put("/:id", jira_customers.update);

  // Delete a customer with id
  router.delete("/:id", jira_customers.delete);

    // Retrieve all Jira issues with id customer
    router.get("/:id/issue", jira_customers.findbyCustomerId);

      // Retrieve a single Jira issue with id customer
      router.get("/:idcust/issue/:idiss", jira_customers.findissuebycustId);

        // Retrieves all worklogs from an issue from a customer
        router.get("/:idcust/issue/:idiss/worklog", jira_customers.findworkloginissue);

          // Retrieve one worklog from an issue from a customer
          router.get("/:idcust/issue/:id/worklog/:idwl", jira_customers.findOneworklog);

  app.use("/api/v1/jira/customer", router);
};
