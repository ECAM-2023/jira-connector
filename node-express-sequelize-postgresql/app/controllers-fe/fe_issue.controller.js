const db = require("../models");
const Jira_Issue = db.jira_issues;
const Op = db.Sequelize.Op;
const axios = require('axios');


// Create and Save a new issue
exports.create = (req, res) => {
  
  // Validate request
  if (!req.body.issue_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Jira_issue object
    const jira_issue = {
      issue_id: req.body.issue_id,
      key:req.body.key,
      nameIssueType:req.body.nameIssueType,
      timespent:req.body.timespent,
      updated:req.body.updated,
      description:req.body.description,
      status:req.body.status,
      summary: req.body.summary,
      userId:req.body.userId,
      organizationId:req.body.organizationId
    };
  // post issue in jira-connector by frontend 
  axios.post('http://10.1.100.244:8080/api/v1/jira/issue', jira_issue)
  .then(response => {
    res.send(response.data); // logs the response from the server
  })
  .catch(error => {
    console.error(error); // logs any errors that occur
  });
};

// Retrieve all issues from the jira-connector.
exports.findAll = (req, res) => {

  axios.get('http://10.1.100.244:8080/api/v1/jira/issue')
  .then(response => {
    
    res.send(response.data);})
  .catch(error => {console.log(error); 
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving issues."
    });
  })
};

// Find a single issue with an accountId
exports.findOne = (req, res) => {

  const id = req.params.id;
  axios.get('http://10.1.100.244:8080/api/v1/jira/issue/' + id)
  .then(response => {
    res.send(response.data); // logs the response from the server
  })
  .catch(error => {
    console.error(error); // logs any errors that occur
  });
};

// Update a issue by the id in the request
exports.update = (req, res) => {

  const id = req.params.id;
  const jira_issue = {
    issue_id: req.body.issue_id,
    key:req.body.key,
    nameIssueType:req.body.nameIssueType,
    timespent:req.body.timespent,
    updated:req.body.updated,
    description:req.body.description,
    status:req.body.status,
    summary: req.body.summary,
    userId:req.body.userId,
    organizationId:req.body.organizationId
  };

  axios.put('http://10.1.100.244:8080/api/v1/jira/issue/' + id, jira_issue)
  .then(response => {
    res.send(response.data); // logs the response from the server
  })
  .catch(error => {
    console.error(error); // logs any errors that occur
  });
};

// Delete a jira issue with the specified id in the request
exports.delete = (req, res) => {

  const id = req.params.id;

  axios.delete('http://10.1.100.244:8080/api/v1/jira/issue/' + id)
  .then(response => {
    res.send(response.data); // logs the response from the server
  })
  .catch(error => {
    console.error(error); // logs any errors that occur
  });
};
