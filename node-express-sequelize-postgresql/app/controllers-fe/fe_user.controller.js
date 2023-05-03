const db = require("../models");
const axios = require('axios');
const Jira = db.jira_users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.accountId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

class Jira_user{
  
  constructor(accountId, accountType,emailAddress,displayName) {
    this.accountId = accountId;
    this.accountType = accountType;
    this.emailAddress = emailAddress;
    this.displayName = displayName;
  }
}

  // Create a User
  const jira_user = new Jira_user(req.body.accountId,req.body.accountType,req.body.emailAddress,req.body.displayName)

  // Save User in the database
  Jira.create(jira_user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const accountType = req.query.accountType;
  var condition = accountType ? { accountType: { [Op.iLike]: `%${accountType}%` } } : null;



  Jira.findAll({ where: condition })
    .then(data => {
      axios.get('http://10.1.100.244:8080/api/v1/jira/user')
      .then(response => {
        
        data = response.data
        res.send(data);})
      .catch(error => {console.log(error); 
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      }); 
      
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Find a single User with an accountId
exports.findOne = (req, res) => {
  const id = req.params.id;

  Jira.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Jira.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a jira user with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Jira.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "jira user was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete jira user with id=${id}. Maybe jira user was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete jira user with id=" + id
      });
    });
};

// Delete all jira user from the database.
exports.deleteAll = (req, res) => {
Jira.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} jira users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all jira users."
      });
    });
};