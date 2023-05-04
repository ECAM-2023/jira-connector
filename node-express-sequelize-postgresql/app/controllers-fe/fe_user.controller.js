const db = require("../models");
const axios = require('axios');
const Jira = db.jira_users;
const Op = db.Sequelize.Op;

// Create class
class Jira_user{

  constructor(accountId, accountType,emailAddress,displayName) {
    this.accountId = accountId;
    this.accountType = accountType;
    this.emailAddress = emailAddress;
    this.displayName = displayName;
  }
}
// Create and Save a new User
exports.create = (req, res) => {
  
  // Validate request
  if (!req.body.accountId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Jira_user object
  const jira_user = new Jira_user(req.body.accountId,req.body.accountType,req.body.emailAddress,req.body.displayName)

  // post user in jira-connector by frontend 
  axios.post('http://10.1.100.244:8080/api/v1/jira/user', jira_user)
  .then(response => {
    res.send(response.data); // logs the response from the server
  })
  .catch(error => {
    console.error(error); // logs any errors that occur
  });
};

// Retrieve all Users from the jira-connector.
exports.findAll = (req, res) => {

  axios.get('http://10.1.100.244:8080/api/v1/jira/user')
  .then(response => {
    
    res.send(response.data);})
  .catch(error => {console.log(error); 
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving users."
    });
  })
};

// Find a single User with an accountId
exports.findOne = (req, res) => {

  const id = req.params.id;
  axios.get('http://10.1.100.244:8080/api/v1/jira/user/' + id)
  .then(response => {
    res.send(response.data); // logs the response from the server
  })
  .catch(error => {
    console.error(error); // logs any errors that occur
  });
};

// Update a User by the id in the request
exports.update = (req, res) => {

  const id = req.params.id;
  const jira_user = new Jira_user(req.body.accountId,req.body.accountType,req.body.emailAddress,req.body.displayName)

  axios.put('http://10.1.100.244:8080/api/v1/jira/user/' + id, jira_user)
  .then(response => {
    res.send(response.data); // logs the response from the server
  })
  .catch(error => {
    console.error(error); // logs any errors that occur
  });
};

// Delete a jira user with the specified id in the request
exports.delete = (req, res) => {

  const id = req.params.id;

  axios.delete('http://10.1.100.244:8080/api/v1/jira/user/' + id)
  .then(response => {
    res.send(response.data); // logs the response from the server
  })
  .catch(error => {
    console.error(error); // logs any errors that occur
  });
};