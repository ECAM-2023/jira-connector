const db = require("../models");
const View_Customer_Organization = db.view_customer_organizations;
const Op = db.Sequelize.Op;

// Create and Save a new View_Customer_Organization
exports.create = (req, res) => {
  // Validate request
  if (!req.body.accountId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Jira View_Customer_Organization
  const view_customer_organization = {
    accountId: req.body.accountId,
    organizationID: req.body.organizationID
  };

  // Save Jira View_Customer_Organization in the database
  View_Customer_Organization.create(view_customer_organization)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Jira View_Customer_Organization."
      });
    });
};

// Retrieve all Jira View_Customer_Organizations from the database.
exports.findAll = (req, res) => {
  const accountId = req.query.accountId;
  var condition = accountId ? { accountId: { [Op.iLike]: `%${accountId}%` } } : null;

  View_Customer_Organization.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving View_Customer_Organizations."
      });
    });
};

// Find a single Jira View_Customer_Organization with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  View_Customer_Organization.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find View_Customer_Organization with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving View_Customer_Organization with id=" + id
      });
    });
};

// Update a View_Customer_Organization by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  View_Customer_Organization.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Jira View_Customer_Organization was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Jira View_Customer_Organization with id=${id}. Maybe Jira View_Customer_Organization was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating View_Customer_Organization with id=" + id
      });
    });
};

// Delete a View_Customer_Organization with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  View_Customer_Organization.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "View_Customer_Organization was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete View_Customer_Organization with id=${id}. Maybe View_Customer_Organization was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete View_Customer_Organization with id=" + id
      });
    });
};

// Delete all View_Customer_Organizations from the database.
exports.deleteAll = (req, res) => {
  View_Customer_Organization.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} View_Customer_Organizations were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all View_Customer_Organizations."
      });
    });
};


