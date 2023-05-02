import { Component } from "react";
import { Col, Container, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import IJiraUser from "./types/jira_user.type";

import JiraUser from "./components/jira_user.component";
import JiraUsersList from "./components/jira_users-list.component";
import JiraUserAddValidation from "./components/jira_user-add-validation.component";

import JiraOrganization from "./components/jira_organization.component";
import JiraOrganizationsList from "./components/jira_organizations-list.component";
import JiraOrganizationAdd from "./components/jira_organization-add-validation.component";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import Settings from "./components/settings.component";

import EventBus from "./common/EventBus";
import JiraCustomersList from "./components/jira_customers-list.component";

type Props = {};

type State = {
    currentUser: IJiraUser | undefined;
};

class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.logout = this.logout.bind(this);

        this.state = {
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
            });
        }

        EventBus.on("logout", this.logout);
    }

    componentWillUnmount() {
        EventBus.remove("logout", this.logout);
    }

    logout() {
        AuthService.logout();
        this.setState({
            currentUser: undefined,
        });
    }

    render() {
        const { currentUser } = this.state;

        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/jira/user"} className="navbar-brand">
                        Jira Connector
                    </Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/jira/user"} className="nav-link">
                                Users
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/jira/organization"} className="nav-link">
                                Organizations
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to={"/jira/customer"} className="nav-link">
                                Customers
                            </Link>
                        </li>

                        <Nav className="">
                            <NavDropdown id="nav-dropdown-dark-example" title="Add new" menuVariant="dark">
                                <NavDropdown.Item href="/adduser">Add user</NavDropdown.Item>
                                <NavDropdown.Item href="/addorganization">Add organization</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </div>
                    <div className="navbar-nav ms-auto">
                        {currentUser ? (
                            <div className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link to={"/profile"} className="nav-link">
                                        {currentUser.displayName}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a href="/login" className="nav-link" onClick={this.logout}>
                                        Log Out
                                    </a>
                                </li>
                            </div>
                        ) : (
                            <div className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link to={"/login"} className="nav-link">
                                        Login
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to={"/register"} className="nav-link">
                                        Register
                                    </Link>
                                </li>
                            </div>
                        )}
                        <li className="nav-item">
                            <Link to={"/settings"} className="nav-link">
                                <Image src="settings.jpg" alt="settings-img" /> Settings
                            </Link>
                        </li>
                    </div>
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/jira/user"]} component={JiraUsersList} />
                        <Route path="/jira/user/:id" component={JiraUser} />
                        <Route exact path="/adduser" component={JiraUserAddValidation} />

                        <Route exact path={["/", "/jira/organization"]} component={JiraOrganizationsList} />
                        <Route path="/jira/organization/:id" component={JiraOrganization} />
                        <Route exact path="/addorganization" component={JiraOrganizationAdd} />

                        <Route exact path={["/", "/jira/customer"]} component={JiraCustomersList} />

                        <Route exact path={["/", "/login"]} component={Login} />
                        <Route exact path={["/", "/register"]} component={Register} />
                        <Route exact path="/profile" component={Profile} />
                        <Route exact path="/settings" component={Settings} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
