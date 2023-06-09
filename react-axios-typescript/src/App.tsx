import { Component } from "react";
import { Col, Container, Nav, Navbar, NavDropdown, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Jira Icon source : https://atlassian.design/components/logo/examples#jira
import { JiraIcon } from "@atlaskit/logo";

import imageSettingsIcon from "./settings-icon.png";

import i18n from "./i18n/i18n";
import { useTranslation } from "react-i18next";

// Home Page
import Home from "./components/home";

// Issues
import JiraIssuesList from "./components/jira_issues-list.component";
import JiraIssue from "./components/jira_issue.component";
import JiraWorklogsList from "./components/jira_worklogs-list.component";
import JiraWorklog from "./components/jira_worklog.component";

// Users
import JiraUser from "./components/jira_user.component";
import JiraUsersList from "./components/jira_users-list.component";

// Organizations
import JiraOrganization from "./components/jira_organization.component";
import JiraOrganizationsList from "./components/jira_organizations-list.component";

// Customers
import JiraCustomersList from "./components/jira_customers-list.component";
import JiraCustomer from "./components/jira_customer.component";

// Add new
import JiraIssueAdd from "./components/jira_issue-add.component";
import JiraUserAdd from "./components/jira_user-add-validation.component";
import JiraOrganizationAdd from "./components/jira_organization-add-validation.component";

import AuthService from "./services/auth.service";
import IJiraUser from "./types/jira_user.type";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import Settings from "./components/settings.component";

import EventBus from "./common/EventBus";

type Props = {};

type State = {
    showModeratorBoard: boolean;
    showAdminBoard: boolean;
    currentUser: IJiraUser | undefined;
};

function MultiLanguagesText() {
    const { t, i18n } = useTranslation(["app"]);

    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to={"/home"} className="navbar-brand text-white">
                    <JiraIcon appearance="brand" />
                    {t("title")}
                </Link>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to={"/jira/organization"} className="nav-link text-light">
                            {t("Organizations")}
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/jira/customer"} className="nav-link text-light">
                            {t("Customers")}
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/jira/issue"} className="nav-link text-light">
                            {t("Issues")}
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/jira/user"} className="nav-link text-light">
                            {t("Users")}
                        </Link>
                    </li>

                    <Nav>
                        <NavDropdown id="nav-dropdown-dark" title={t("AddNew")}>
                            <NavDropdown.Item href="/addorganization">{t("AddNewOrganization")}</NavDropdown.Item>
                            <NavDropdown.Item href="/addissue">{t("AddNewIssue")}</NavDropdown.Item>
                            <NavDropdown.Item href="/adduser">{t("AddNewUser")}</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </div>
            </nav>
        </div>
    );
}

function UserConnected() {
    const { t, i18n } = useTranslation(["app"]);

    return (
        <div className="navbar-nav ms-auto">
            <li className="nav-item">
                <Link to={"/login"} className="nav-link text-light">
                    Login
                </Link>
            </li>

            <li className="nav-item">
                <Link to={"/register"} className="nav-link text-light">
                    Register
                </Link>
            </li>
        </div>
    );
}

function CopyrightFooter() {
    const { t, i18n } = useTranslation(["app"]);

    return (
        <footer>
            <div className="copyright">
                <p>ECAM &copy; 2023. {t("Copyright")}</p>
            </div>
            <div className="version">
                <p>v0.1.0</p>
            </div>
        </footer>
    );
}

class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.logout = this.logout.bind(this);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
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
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined,
        });
    }

    render() {
        const { currentUser } = this.state;

        return (
            <div className="page-container">
                <div className="app">
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <MultiLanguagesText />
                        <div className="navbar-nav ml-auto p-2">
                            {currentUser ? (
                                <div className="navbar-nav">
                                    <li className="nav-item">
                                        <Link to={"/profile"} className="nav-link text-light">
                                            {currentUser.displayName}
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <a href="/login" className="nav-link text-light" onClick={this.logout}>
                                            Log Out
                                        </a>
                                    </li>
                                </div>
                            ) : (
                                <UserConnected />
                            )}
                            <li className="nav-item">
                                <Link to={"/settings"} className="nav-link text-light">
                                    <img src={imageSettingsIcon} alt="SettingsIcon" width="20" />
                                    Settings
                                </Link>
                            </li>
                        </div>
                    </nav>

                    <div className="container mt-3">
                        <Switch>
                            <Route exact path={["/", "/home"]} component={Home} />

                            {/* Issues */}
                            <Route exact path={["/", "/jira/issue"]} component={JiraIssuesList} />
                            <Route path="/jira/issue/edit/:id" component={JiraIssue} />
                            {/* <Route path="/jira/issue/:id" component={JiraIssue} /> */}
                            {/* Worklogs in issues */}
                            <Route exact path={["/", "/jira/issue/worklog"]} component={JiraWorklogsList} />
                            <Route path="/jira/issue/worklog/:id" component={JiraWorklog} />

                            {/* Users */}
                            <Route exact path={["/", "/jira/user"]} component={JiraUsersList} />
                            <Route path="/jira/user/:id" component={JiraUser} />

                            {/* Add new */}
                            <Route exact path="/addissue" component={JiraIssueAdd} />
                            <Route exact path="/adduser" component={JiraUserAdd} />
                            <Route exact path="/addorganization" component={JiraOrganizationAdd} />

                            {/* Organizations */}
                            <Route exact path={["/", "/jira/organization"]} component={JiraOrganizationsList} />
                            <Route path="/jira/organization/edit/:id" component={JiraOrganization} />
                            <Route exact path="/jira/viewco" component={JiraCustomersList} />

                            {/* Customers */}
                            <Route exact path={["/", "/jira/customer"]} component={JiraCustomersList} />
                            <Route path="/jira/customer/:id" component={JiraCustomer} />

                            {/* Login & Register */}
                            <Route exact path={["/", "/login"]} component={Login} />
                            <Route exact path={["/", "/register"]} component={Register} />

                            {/* Profile & Settings */}
                            <Route exact path="/profile" component={Profile} />
                            <Route exact path="/settings" component={Settings} />
                        </Switch>
                    </div>
                </div>
                <CopyrightFooter />
            </div>
        );
    }
}

export default App;
