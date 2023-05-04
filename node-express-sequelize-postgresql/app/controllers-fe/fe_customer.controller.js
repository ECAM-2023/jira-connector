const db = require("../models");
const Jira = db.jira_customers;
const Op = db.Sequelize.Op;
const axios = require('axios');



// Create and Save a new customer
exports.create = (req, res) => {
  
  // Validate request
  if (!req.body.accountId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Jira_customer object
  const jira_customer = {
    accountId: req.body.accountId,
    accountType: req.body.accountType,
    emailAddress: req.body.emailAddress,
    displayName: req.body.displayName
  };
  // post customer in jira-connector by frontend 
  axios.post('http://10.1.100.244:8080/api/v1/jira/customer', jira_customer)
  .then(response => {
    res.send(response.data); // logs the response from the server
  })
  .catch(error => {
    console.error(error); // logs any errors that occur
  });
};

// Retrieve all customers from the jira-connector.
exports.findAll = (req, res) => {

  axios.get('http://10.1.100.244:8080/api/v1/jira/customer')
  .then(response => {
    
    res.send(response.data);})
  .catch(error => {console.log(error); 
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving customers."
    });
  })
};

// Find a single customer with an accountId
exports.findOne = (req, res) => {

  const id = req.params.id;
  axios.get('http://10.1.100.244:8080/api/v1/jira/customer/' + id)
  .then(response => {
    res.send(response.data); // logs the response from the server
  })
  .catch(error => {
    console.error(error); // logs any errors that occur
  });
};

// Update a customer by the id in the request
exports.update = (req, res) => {

  const id = req.params.id;
  const jira_customer = {
    accountId: req.body.accountId,
    accountType: req.body.accountType,
    emailAddress: req.body.emailAddress,
    displayName: req.body.displayName
  };

  axios.put('http://10.1.100.244:8080/api/v1/jira/customer/' + id, jira_customer)
  .then(response => {
    res.send(response.data); // logs the response from the server
  })
  .catch(error => {
    console.error(error); // logs any errors that occur
  });
};

// Delete a jira customer with the specified id in the request
exports.delete = (req, res) => {

  const id = req.params.id;

  axios.delete('http://10.1.100.244:8080/api/v1/jira/customer/' + id)
  .then(response => {
    res.send(response.data); // logs the response from the server
  })
  .catch(error => {
    console.error(error); // logs any errors that occur
  });
};