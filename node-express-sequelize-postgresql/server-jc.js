const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: true,
  Method: ['GET']
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

const db = require("./app/models");
db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to jira connector's API." });
});

// Routes view_customer_organization
require("./app/routes-jira/view_customer_organization.routes")(app);

// Routes organization
require("./app/routes-jira/jira_organization.routes")(app);

// Routes Tutorial
require("./app/routes-jira/turorial.routes")(app);

// Routes Jira
require("./app/routes-jira/jira_user.routes")(app);

//Routes customer
require("./app/routes-jira/jira_customer.routes")(app);

//Routes issue
// require("./app/routes-jira/jira_issue.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
