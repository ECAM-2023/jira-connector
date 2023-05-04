const db = require("../models");
const Jira_Worklog = db.jira_worklog;
const Op = db.Sequelize.Op;

// Create and Save a new Issue
exports.create = (req, res) => {

  if (!req.body.worklog_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  
  // Create a Jira Issue
  const jira_worklog = {
    worklog_id:req.body.worklog_id,
    issue_id: req.body.issue_id,
    creatorId:req.body.creatorId,
    timespent:req.body.timespent,
    updated:req.body.updated,
    description:req.body.description,
  };

  // Save Jira Issue in the database
  Jira_Worklog.create(jira_worklog)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Jira Worklog."
      });
    });
};

// Retrieve all Jira Worklogs from the database.
exports.findAll = (req, res) => {

  Jira_Worklog.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Worklogs."
      });
    });
};

// Find a single Jira Worklog with an id
exports.findworklogs = (req, res) => {
  //const id = req.params.id
  const idwl = req.params.id;
  var condition =  idwl ? { worklog_id: { [Op.iLike]: `%${idwl}%` } } : null;
  //{ where: condition }
  Jira_Worklog.findAll({ where: condition })
  //Jira_Worklog.query("SELECT * FROM public.jira_worklogs WHERE WORKLOG_ID = '10015'")
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Worklog with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Worklog with id=" + id
      });
    });
};
// Find a single Jira Worklog with an id
exports.findOne = (req, res) => {
  const id = req.params.id
  //const idwl = req.params.id;
  //var condition =  idwl ? { worklog_id: { [Op.iLike]: `%${idwl}%` } } : null;
  //{ where: condition }
  Jira_Worklog.findByPk(id)
  //Jira_Worklog.query("SELECT * FROM public.jira_worklogs WHERE WORKLOG_ID = '10015'")
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Worklog with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Worklog with id=" + id
      });
    });
};

// Update a Worklog by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Jira_Worklog.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Jira Worklog was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Jira Worklog with id=${id}. Maybe Jira Worklog was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Worklog with id=" + id
      });
    });
};

// Delete a Worklog with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Jira_Worklog.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Worklog was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Worklog with id=${id}. Maybe Worklog was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Worklog with id=" + id
      });
    });
};

// Delete all Worklogs from the database.
exports.deleteAll = (req, res) => {
  Jira_Worklog.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Worklogs were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Worklogs."
      });
    });
};
