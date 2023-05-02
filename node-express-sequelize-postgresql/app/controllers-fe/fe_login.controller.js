const db = require("../models");
const User_Login = db.login;
const Op = db.Sequelize.Op;

// Create and Save a new Issue
exports.create = (req, res) => {
  // // Validate request
  // if (!req.body.id) {
  //   res.status(400).send({
  //     message: "Content can not be empty!"
  //   });
  //   return;
  // }

  // Create a Jira Issue
  const user_login = {
    issue_id: req.body.id,
    summary: req.body.fields.summary
  };

  // Save Jira Issue in the database
  User_Login.create(user_login)
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

  User_Login.findAll()
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

  User_Login.findByPk(id)
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

  User_Login.update(req.body, {
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

  User_Login.destroy({
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
  User_Login.destroy({
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
