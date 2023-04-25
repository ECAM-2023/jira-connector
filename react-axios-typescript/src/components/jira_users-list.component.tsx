import { Component, ChangeEvent } from "react";
import Pagination from "./Pagination";
import JiraUserDataService from "../services/jira_user.service";
import { Link } from "react-router-dom";
import IJiraUserData from "../types/jira_user.type";

type Props = {};

type State = {
    users: Array<IJiraUserData>;
    currentUser: IJiraUserData | null;
    currentIndex: number;
    searchAccountId: string;
    currentPage: number;
    lastPage: number;
};

export default class JiraUsersList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onChangeSearchAccountId = this.onChangeSearchAccountId.bind(this);
        this.retrieveJiraUsers = this.retrieveJiraUsers.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveUser = this.setActiveUser.bind(this);
        this.searchAccountId = this.searchAccountId.bind(this);

        this.state = {
            users: [],
            currentUser: null,
            currentIndex: -1,
            searchAccountId: "",
            currentPage: 1,
            lastPage: 7,
        };
    }

    setCurrentPage(pageNumber: number) {
        this.setState({
            currentPage: pageNumber,
        });
    }

    componentDidMount() {
        this.retrieveJiraUsers();
    }

    onChangeSearchAccountId(e: ChangeEvent<HTMLInputElement>) {
        const searchAccountId = e.target.value;

        this.setState({
            searchAccountId: searchAccountId,
        });
    }

    retrieveJiraUsers() {
        JiraUserDataService.getAll()
            .then((response: any) => {
                this.setState({
                    users: response.data,
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveJiraUsers();
        this.setState({
            currentUser: null,
            currentIndex: -1,
        });
    }

    setActiveUser(user: IJiraUserData, index: number) {
        this.setState({
            currentUser: user,
            currentIndex: index,
        });
    }

    searchAccountId() {
        this.setState({
            currentUser: null,
            currentIndex: -1,
        });

        JiraUserDataService.findByAccountId(this.state.searchAccountId)
            .then((response: any) => {
                this.setState({
                    users: response.data,
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    render() {
        const { searchAccountId, users, currentUser, currentIndex, currentPage, lastPage } = this.state;

        return (
            <div className="list row">
                <div className="container">
                    <h1>Users Pagination</h1>
                    <Pagination
                        currentPage={currentPage}
                        lastPage={lastPage}
                        maxLength={7}
                        setCurrentPage={this.setCurrentPage.bind(this)}
                    />
                </div>
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by accountId"
                            value={searchAccountId}
                            onChange={this.onChangeSearchAccountId}
                        />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" onClick={this.searchAccountId}>
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Users List</h4>

                    <ul className="list-group">
                        {users &&
                            users.map((user: IJiraUserData, index: number) => (
                                <li
                                    className={"list-group-item " + (index === currentIndex ? "active" : "")}
                                    onClick={() => this.setActiveUser(user, index)}
                                    key={index}
                                >
                                    {user.displayName}
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="col-md-6">
                    {currentUser ? (
                        <div>
                            <h4>User</h4>
                            <div>
                                <label>
                                    <strong>AccountId:</strong>
                                </label>{" "}
                                {currentUser.accountId}
                            </div>
                            <div>
                                <label>
                                    <strong>AccountType:</strong>
                                </label>{" "}
                                {currentUser.accountType}
                            </div>
                            <div>
                                <label>
                                    <strong>Email Address:</strong>
                                </label>{" "}
                                {currentUser.emailAddress}
                            </div>
                            <div>
                                <label>
                                    <strong>Name:</strong>
                                </label>{" "}
                                {currentUser.displayName}
                            </div>

                            <Link to={"/jira/" + currentUser.id} className="badge badge-warning">
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a User...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
