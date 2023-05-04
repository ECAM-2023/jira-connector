const db = require("../models");
const Op = db.Sequelize.Op;
const axios = require('axios');


// Create and Save a new worklog
exports.create = (req, res) => {
  
  // Validate request
  if (!req.body.worklog_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Jira_worklog object
    const jira_worklog = {
      worklog_id:req.body.worklog_id,
      issue_id: req.body.issue_id,
      creatorId:req.body.creatorId,
      timespent:req.body.timespent,
      updated:req.body.updated,
      description:req.body.description,
    };
  // post worklog in jira-connector by frontend 
  axios.post('http://10.1.100.244:8080/api/v1/jira/issue/worklog', jira_worklog)
  .then(response => {
    res.send(response.data); // logs the response from the server
  })
  .catch(error => {
    console.error(error); // logs any errors that occur
  });
};

// Retrieve all worklogs from the jira-connector.
exports.findAll = (req, res) => {

  axios.get('http://10.1.100.244:8080/api/v1/jira/issue/worklog')
  .then(response => {
    
    res.send(response.data);})
  .catch(error => {console.log(error); 
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving worklogs."
    });
  })
};

// Find a single worklog with an accountId
exports.findOne = (req, res) => {

  const id = req.params.id;
  axios.get('http://10.1.100.244:8080/api/v1/jira/issue/worklog/' + id)
  .then(response => {
    res.send(response.data); // logs the response from the server
  })
  .catch(error => {
    console.error(error); // logs any errors that occur
  });
};

// Update a worklog by the id in the request
exports.update = (req, res) => {

  const id = req.params.id;
  const jira_worklog = {
    worklog_id:req.body.worklog_id,
    issue_id: req.body.issue_id,
    creatorId:req.body.creatorId,
    timespent:req.body.timespent,
    updated:req.body.updated,
    description:req.body.description,
  };

  axios.put('http://10.1.100.244:8080/api/v1/jira/issue/worklog/' + id, jira_worklog)
  .then(response => {
    res.send(response.data); // logs the response from the server
  })
  .catch(error => {
    console.error(error); // logs any errors that occur
  });
};

// Delete a jira worklog with the specified id in the request
exports.delete = (req, res) => {

  const id = req.params.id;

  axios.delete('http://10.1.100.244:8080/api/v1/jira/issue/worklog/' + id)
  .then(response => {
    res.send(response.data); // logs the response from the server
  })
  .catch(error => {
    console.error(error); // logs any errors that occur
  });
};
