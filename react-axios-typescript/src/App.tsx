import { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorials-list.component";

import JiraUser from "./components/jira_user.component";
import JiraUsersList from "./components/jira_users-list.component";
import JiraUserAdd from "./components/jira_user-add.component";

import JiraOrganization from "./components/jira_organization.component";
import JiraOrganizationsList from "./components/jira_organizations-list.component";
import JiraOrganizationAdd from "./components/jira_organization-add.component";

import Register from "./components/register.component";

class App extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/jira/user"} className="navbar-brand">
                        Jira Connector
                    </Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/tutorials"} className="nav-link">
                                Tutorials
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/add"} className="nav-link">
                                Add tutorial
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/jira/user"} className="nav-link">
                                Users
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/adduser"} className="nav-link">
                                Add user
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/jira/organization"} className="nav-link">
                                Organizations
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/addorganization"} className="nav-link">
                                Add organization
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/register"} className="nav-link">
                                Register
                            </Link>
                        </li>
                    </div>
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
                        <Route exact path="/add" component={AddTutorial} />
                        <Route path="/tutorials/:id" component={Tutorial} />
                        <Route exact path={["/", "/jira/user"]} component={JiraUsersList} />
                        <Route path="/jira/user/:id" component={JiraUser} />
                        <Route exact path="/adduser" component={JiraUserAdd} />
                        <Route exact path={["/", "/jira/organization"]} component={JiraOrganizationsList} />
                        <Route path="/jira/organization/:id" component={JiraOrganization} />
                        <Route exact path="/addorganization" component={JiraOrganizationAdd} />
                        <Route exact path={["/", "/register"]} component={Register} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;