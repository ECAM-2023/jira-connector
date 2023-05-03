const db = require("../models");
const Jira_Organization = db.jira_organisations;
const Op = db.Sequelize.Op;

// Create and Save a new Organisation
exports.create = (req, res) => {
  // Validate request
  if (!req.body.organizationID) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Jira Organisation
  const jira_organization = {
    organizationID: req.body.organizationID,
    name: req.body.name
  };

  // Save Jira Organisation in the database
  Jira_Organization.create(jira_organization)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Jira Organisation."
      });
    });
};

// Retrieve all Jira Organisations from the database.
exports.findAll = (req, res) => {

  Jira_Organization.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Organisations."
      });
    });
};

// Find a single Jira Organisation with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Jira_Organization.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Organisation with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Organisation with id=" + id
      });
    });
};

// Update a Organisation by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Jira_Organization.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Jira Organisation was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Jira Organisation with id=${id}. Maybe Jira Organisation was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Organisation with id=" + id
      });
    });
};

// Delete a Organisation with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Jira_Organization.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Organisation was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Organisation with id=${id}. Maybe Organisation was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Organisation with id=" + id
      });
    });
};

// Delete all Organisations from the database.
exports.deleteAll = (req, res) => {
  Jira_Organization.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Organisations were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Organisations."
      });
    });
};
