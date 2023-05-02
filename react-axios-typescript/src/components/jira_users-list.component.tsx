import { Component, ChangeEvent } from "react";
import JiraUserDataService from "../services/jira_user.service";
import { Link } from "react-router-dom";
import IJiraUserData from "../types/jira_user.type";
import * as XLSX from "xlsx";

type Props = {};

type State = {
    users: Array<IJiraUserData>;
    currentUser: IJiraUserData | null;
    currentIndex: number;
    searchAccountId: string;
    currentPage: number;
    lastPage: number;
    usersPerPage: number;
    exportFormat: string;
};

const USERS_PER_PAGE = 5;

export default class JiraUsersList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onChangeSearchAccountId = this.onChangeSearchAccountId.bind(this);
        this.retrieveJiraUsers = this.retrieveJiraUsers.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveUser = this.setActiveUser.bind(this);
        this.searchAccountId = this.searchAccountId.bind(this);
        this.handleClickExportButton = this.handleClickExportButton.bind(this);

        this.state = {
            users: [],
            currentUser: null,
            currentIndex: -1,
            searchAccountId: "",
            currentPage: 1,
            lastPage: 5,
            usersPerPage: 5,
            exportFormat: "xlsx",
        };
    }

    handleClickExportButton() {
        // Données à exporter
        const { users } = this.state;

        const data = [
            ["AccountId", "AccountType", "Email", "DisplayName"],
            ...users.map((user) => [user.accountId, user.accountType, user.emailAddress, user.displayName]),
        ];

        if (this.state.exportFormat === "xlsx") {
            const workbook = XLSX.utils.book_new();

            const worksheet = XLSX.utils.aoa_to_sheet(data);
            XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

            XLSX.writeFile(workbook, "usersList.xlsx");
        } else if (this.state.exportFormat === "word") {
            return;
        } else if (this.state.exportFormat === "rst") {
            return;
        }
    }

    getPaginatedUsers() {
        const { users, currentPage } = this.state;
        const startIndex = (currentPage - 1) * USERS_PER_PAGE;
        const endIndex = startIndex + USERS_PER_PAGE;
        return users.slice(startIndex, endIndex);
    }

    setCurrentPage(pageNumber: number, usersPerPage: number) {
        this.setState({
            currentPage: pageNumber,
            usersPerPage: usersPerPage,
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

        const { searchAccountId } = this.state;
        JiraUserDataService.findByAccountId(searchAccountId)
            .then((response: any) => {
                const filteredUsers = response.data.filter((user: IJiraUserData) =>
                    user.accountId.toLowerCase().includes(searchAccountId.toLowerCase())
                );
                this.setState({
                    users: filteredUsers,
                    currentPage: 1, // Reset to first page
                    lastPage: Math.ceil(filteredUsers.length / 5), // Update last page count
                });
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    render() {
        const { searchAccountId, users, currentUser, currentIndex, currentPage, lastPage, usersPerPage, exportFormat } =
            this.state;
        const startIndex = (currentPage - 1) * usersPerPage;
        const endIndex = Math.min(startIndex + usersPerPage, users.length);
        const displayedUsers = users.slice(startIndex, endIndex);

        // Calculate the index of the first user to display on the current page
        const indexOfLastUser = currentPage * usersPerPage;
        const indexOfFirstUser = indexOfLastUser - usersPerPage;
        // Get the users to display on the current page
        const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
        // Calculate the total number of pages based on the number of users and usersPerPage
        const totalPages = Math.ceil(users.length / usersPerPage);
        const paginatedUsers = this.getPaginatedUsers();

        return (
            <div className="list row">
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

                <div className="col-md-7">
                    <label htmlFor="users-per-page">Users per page:</label>
                    <select
                        id="users-per-page"
                        className="form-select"
                        value={usersPerPage}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                            this.setCurrentPage(1, parseInt(e.target.value))
                        }
                    >
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                    </select>
                </div>

                <div className="col-md-6">
                    <h4>Users List</h4>

                    <nav>
                        <ul className="pagination">
                            {Array.from(Array(totalPages).keys()).map((pageNumber) => (
                                <li
                                    key={pageNumber}
                                    className={"page-item " + (currentPage === pageNumber + 1 ? "active" : "")}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => this.setCurrentPage(pageNumber + 1, usersPerPage)}
                                    >
                                        {pageNumber + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <ul className="list-group">
                        {displayedUsers &&
                            displayedUsers.map((user: IJiraUserData, index: number) => (
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
                            <Link to={"/jira/user/" + currentUser.id} className="badge badge-warning">
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
                <div className="col-md-6">
                    Export Users List as :
                    <select
                        value={this.state.exportFormat}
                        onChange={(e) => this.setState({ exportFormat: e.target.value })}
                    >
                        <option value="xlsx">.xlsx</option>
                        <option value="word">.docx</option>
                        <option value="rst">.rst</option>
                        <option value="pdf">.pdf</option>
                    </select>
                    <div>
                        <button onClick={this.handleClickExportButton.bind(this)}>
                            Exporter en {this.state.exportFormat}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
