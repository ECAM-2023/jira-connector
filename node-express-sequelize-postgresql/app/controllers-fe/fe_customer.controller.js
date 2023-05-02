const db = require("../models");
const Jira = db.jira_customers;
const Op = db.Sequelize.Op;

// Create and Save a new customer
exports.create = (req, res) => {
  // Validate request
  if (!req.body.accountId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a customer
  const jira_customer = {
    accountId: req.body.accountId,
    accountType: req.body.accountType,
    emailAddress: req.body.emailAddress,
    displayName: req.body.displayName
  };

  // Save customer in the database
  Jira.create(jira_customer)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the customer."
      });
    });
};

// Retrieve all customers from the database.
exports.findAll = (req, res) => {
  const accountType = req.query.accountType;
  var condition = accountType ? { accountType: { [Op.iLike]: `%${accountType}%` } } : null;

  Jira.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    });
};

// Find a single customer with an accountId
exports.findOne = (req, res) => {
  const id = req.params.id;

  Jira.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find customer with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving customer with id=" + id
      });
    });
};

// Update a customer by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Jira.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "customer was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update customer with id=${id}. Maybe customer was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating customer with id=" + id
      });
    });
};

// Delete a jira customer with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Jira.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "jira customer was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete jira customer with id=${id}. Maybe jira customer was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete jira customer with id=" + id
      });
    });
};

// Delete all jira customer from the database.
exports.deleteAll = (req, res) => {
Jira.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} jira customers were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all jira customers."
      });
    });
};