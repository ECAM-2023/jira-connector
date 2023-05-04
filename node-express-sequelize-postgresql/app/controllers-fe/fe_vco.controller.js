const db = require("../models");
const View_Customer_Organization = db.view_customer_organizations;
const Op = db.Sequelize.Op;
const axios = require('axios');


exports.create = (req, res) => {
  
    // Validate request
    if (!req.body.accountId) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    // Create a Jira_viewco object
    const jira_viewco = {
        organizationID: req.body.organizationID,
        name: req.body.name
      };  
    // post viewco in jira-connector by frontend 
    axios.post('http://10.1.100.244:8080/api/v1/jira/viewco', jira_viewco)
    .then(response => {
      res.send(response.data); // logs the response from the server
    })
    .catch(error => {
      console.error(error); // logs any errors that occur
    });
  };
  
  // Retrieve all viewcos from the jira-connector.
  exports.findAll = (req, res) => {
  
    axios.get('http://10.1.100.244:8080/api/v1/jira/viewco')
    .then(response => {
      
      res.send(response.data);})
    .catch(error => {console.log(error); 
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving viewcos."
      });
    })
  };
  
  // Find a single viewco with an accountId
  exports.findOne = (req, res) => {
  
    const id = req.params.id;
    axios.get('http://10.1.100.244:8080/api/v1/jira/viewco/' + id)
    .then(response => {
      res.send(response.data); // logs the response from the server
    })
    .catch(error => {
      console.error(error); // logs any errors that occur
    });
  };
  
  // Update a viewco by the id in the request
  exports.update = (req, res) => {
  
    const id = req.params.id;
    const jira_viewco = {
        viewcoID: req.body.viewcoID,
        name: req.body.name
      };
  
    axios.put('http://10.1.100.244:8080/api/v1/jira/viewco/' + id, jira_viewco)
    .then(response => {
      res.send(response.data); // logs the response from the server
    })
    .catch(error => {
      console.error(error); // logs any errors that occur
    });
  };
  
  // Delete a jira viewco with the specified id in the request
  exports.delete = (req, res) => {
  
    const id = req.params.id;
  
    axios.delete('http://10.1.100.244:8080/api/v1/jira/viewco/' + id)
    .then(response => {
      res.send(response.data); // logs the response from the server
    })
    .catch(error => {
      console.error(error); // logs any errors that occur
    });
  };


