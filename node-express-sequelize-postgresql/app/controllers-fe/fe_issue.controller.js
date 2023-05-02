const db = require("../models");
const Jira_Issue = db.jira_issues;
const Op = db.Sequelize.Op;

// Create and Save a new Issue
exports.create = (req, res) => {

  // Create a Jira Issue
  const jira_issue = {
    issue_id: req.body.id,
    summary: req.body.summary
  };

  // Save Jira Issue in the database
  Jira_Issue.create(jira_issue)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Jira Issue."
      });
    });
};

// Retrieve all Jira Issues from the database.
exports.findAll = (req, res) => {

  Jira_Issue.findAll()
    .then(data => {
      res.send(data,"ok");
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Issues."
      });
    });
};

// Find a single Jira Issue with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Jira_Issue.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Issue with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Issue with id=" + id
      });
    });
};

// Update a Issue by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Jira_Issue.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Jira Issue was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Jira Issue with id=${id}. Maybe Jira Issue was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Issue with id=" + id
      });
    });
};

// Delete a Issue with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Jira_Issue.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Issue was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Issue with id=${id}. Maybe Issue was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Issue with id=" + id
      });
    });
};

// Delete all Issues from the database.
exports.deleteAll = (req, res) => {
  Jira_Issue.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Issues were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Issues."
      });
    });
};