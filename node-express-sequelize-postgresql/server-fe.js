const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: ["http://localhost:8082","http://localhost:8081"]
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
  res.json({ message: "Welcome to front-end's API" });
});

// Routes view_customer_organization
require("./app/routes/view_customer_organization.routes")(app);

// Routes organization
require("./app/routes/jira_organization.routes")(app);

// Routes Tutorial
require("./app/routes/turorial.routes")(app);

// Routes Jira
require("./app/routes/jira_user.routes")(app);

//Routes customer
require("./app/routes/jira_customer.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
