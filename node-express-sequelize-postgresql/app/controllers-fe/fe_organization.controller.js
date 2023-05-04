const db = require("../models");
const Jira_Organisation = db.jira_organisations;
const Op = db.Sequelize.Op;
const axios = require('axios');

// Create and Save a new Organisation
exports.create = (req, res) => {
  
    // Validate request
    if (!req.body.accountId) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a Jira_organization object
    const jira_organization = {
        organizationID: req.body.organizationID,
        name: req.body.name
      };  
    // post organization in jira-connector by frontend 
    axios.post('http://10.1.100.244:8080/api/v1/jira/organization', jira_organization)
    .then(response => {
      res.send(response.data); // logs the response from the server
    })
    .catch(error => {
      console.error(error); // logs any errors that occur
    });
  };
  
  // Retrieve all organizations from the jira-connector.
  exports.findAll = (req, res) => {
  
    axios.get('http://10.1.100.244:8080/api/v1/jira/organization')
    .then(response => {
      
      res.send(response.data);})
    .catch(error => {console.log(error); 
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving organizations."
      });
    })
  };
  
  // Find a single organization with an accountId
  exports.findOne = (req, res) => {
  
    const id = req.params.id;
    axios.get('http://10.1.100.244:8080/api/v1/jira/organization/' + id)
    .then(response => {
      res.send(response.data); // logs the response from the server
    })
    .catch(error => {
      console.error(error); // logs any errors that occur
    });
  };
  
  // Update a organization by the id in the request
  exports.update = (req, res) => {
  
    const id = req.params.id;
    const jira_organization = {
        organizationID: req.body.organizationID,
        name: req.body.name
      };
  
    axios.put('http://10.1.100.244:8080/api/v1/jira/organization/' + id, jira_organization)
    .then(response => {
      res.send(response.data); // logs the response from the server
    })
    .catch(error => {
      console.error(error); // logs any errors that occur
    });
  };
  
  // Delete a jira organization with the specified id in the request
  exports.delete = (req, res) => {
  
    const id = req.params.id;
  
    axios.delete('http://10.1.100.244:8080/api/v1/jira/organization/' + id)
    .then(response => {
      res.send(response.data); // logs the response from the server
    })
    .catch(error => {
      console.error(error); // logs any errors that occur
    });
  };