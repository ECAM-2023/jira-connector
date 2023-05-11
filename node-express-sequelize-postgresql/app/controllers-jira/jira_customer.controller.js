const db = require("../models");
const Jira = db.jira_customers;
const Jira_Issue = db.jira_issues;
const Jira_Worklog = db.jira_worklog;
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
  var condition = id ? { accountId: { [Op.iLike]: `%${id}%` } } : null;

  Jira.findAll({ where: condition })
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

exports.findbyCustomerId = (req, res) => {
  const id = req.params.id;
  var condition = id ? { userId: { [Op.iLike]: `%${id}%` } } : null;
  
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

exports.findissuebycustId = (req, res) => {
  const idcust = req.params.idcust;
  const idiss = req.params.idiss;
  var conditioncust = idcust ? { userId: { [Op.iLike]: `%${idcust}%` } } : null
  var conditioniss = idiss ? { issue_id: { [Op.iLike]: `%${idiss}%` } } : null;

  Jira_Issue.findAll({
    where: {
      [Op.and]: [
        conditioncust,
        conditioniss
      ]
    }})
    .then(data => {
      if (data) {
        res.send(data);
      } 
      else {
        res.status(404).send({
          message: `Cannot find Issue with idorg=${idiss}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving issue with id=" + idiss
      });
    });
};

exports.findworkloginissue = (req, res) => {
  const id = req.params.idiss;
  var condition = id ? { issue_id: { [Op.iLike]: `%${id}%` } } : null;

  Jira_Worklog.findAll({where: condition})
    .then(data => {
      if (data) {
        res.send (data);
        };
    })
      };
      
exports.findOneworklog = (req, res) => {
  //const id = req.params.id
  const idwl = req.params.idwl;
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

