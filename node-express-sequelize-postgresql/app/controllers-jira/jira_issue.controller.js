const db = require("../models");
const Jira_Issue = db.jira_issues;
const Jira_Worklog = db.jira_worklog;
const Op = db.Sequelize.Op;

// Create and Save a new Issue
exports.create = (req, res) => {

  if (!req.body.issue_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  // Create a Jira Issue
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
    organizationid:req.body.organizationId
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
  const summary = req.query.summary;
  var condition = summary ? { summary: { [Op.iLike]: `%${summary}%` } } : null;

  Jira_Issue.findAll()
    .then(data => {
      res.send(data);
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

exports.findbyOrganisationId = (req, res) => {
  const id = req.params.id;
  var condition = id ? { organizationId: { [Op.iLike]: `%${id}%` } } : null;
  Jira_Issue.findAll({where: condition})
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

exports.findworkloginissue = (req, res) => {
  const id = req.params.id;
  var condition = id ? { issue_id: { [Op.iLike]: `%${id}%` } } : null;

  Jira_Worklog.findAll({where: condition})
    .then(data => {
      if (data) {
        res.send (data);
        };
    })
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
