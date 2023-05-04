const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: ["http://localhost:8082","http://localhost:8081"],
  Method: ['GET','POST','PUT','DELETE']
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

//Routes customer
require("./app/routes-fe/fe_customer.routes")(app);

// Routes organization
require("./app/routes-fe/fe_organization.routes")(app);

// Routes user
require("./app/routes-fe/fe_user.routes")(app);

// Routes view
require("./app/routes-fe/fe_vco.routes")(app);

// Routes Tutorial
require("./app/routes-fe/turorial.routes")(app);

//Routes issue
require("./app/routes-fe/fe_issue.routes")(app);

//Routes issue
require("./app/routes-fe/fe_login.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8085;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
