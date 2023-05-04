import { Component, ChangeEvent } from "react";
import JiraIssueDataService from "../services/jira_issue.service";
import { Link } from "react-router-dom";
import IJiraIssueData from "../types/jira_issue.type";
import * as XLSX from "xlsx";
import { Table } from "react-bootstrap";

type Props = {};

type State = {
    issues: Array<IJiraIssueData>;
    currentIssue: IJiraIssueData | null;
    currentIndex: number;
    searchIssueId: string;
    currentPage: number;
    lastPage: number;
    issuesPerPage: number;
    exportFormat: string;
};

const ISSUES_PER_PAGE = 5;

export default class JiraIssuesList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.handleClickExportButton = this.handleClickExportButton.bind(this);
        this.onChangeSearchIssueId = this.onChangeSearchIssueId.bind(this);
        this.retrieveJiraIssues = this.retrieveJiraIssues.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveIssue = this.setActiveIssue.bind(this);
        this.searchIssueId = this.searchIssueId.bind(this);

        this.state = {
            issues: [],
            currentIssue: null,
            currentIndex: -1,
            searchIssueId: "",
            currentPage: 1,
            lastPage: 5,
            issuesPerPage: 5,
            exportFormat: "xlsx",
        };
    }

    handleClickExportButton() {
        // Données à exporter
        const { issues } = this.state;

        const data = [
            [
                "issue_id",
                "key",
                "nameIssueType",
                "timespent",
                "updated",
                "description",
                "status",
                "summary",
                "userId",
                "organizationId",
            ],
            ...issues.map((issue) => [
                issue.issue_id,
                issue.key,
                issue.nameIssueType,
                issue.timespent,
                issue.updated,
                issue.description,
                issue.status,
                issue.summary,
                issue.userId,
                issue.organizationId,
            ]),
        ];

        if (this.state.exportFormat === "xlsx") {
            const workbook = XLSX.utils.book_new();

            const worksheet = XLSX.utils.aoa_to_sheet(data);
            XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

            XLSX.writeFile(workbook, "issuesList.xlsx");
        } else if (this.state.exportFormat === "word") {
            return;
        } else if (this.state.exportFormat === "rst") {
            return;
        }
    }

    getPaginatedIssues() {
        const { issues, currentPage } = this.state;
        const startIndex = (currentPage - 1) * ISSUES_PER_PAGE;
        const endIndex = startIndex + ISSUES_PER_PAGE;
        return issues.slice(startIndex, endIndex);
    }

    setCurrentPage(pageNumber: number, issuesPerPage: number) {
        this.setState({
            currentPage: pageNumber,
            issuesPerPage: issuesPerPage,
        });
    }

    componentDidMount() {
        this.retrieveJiraIssues();
    }

    onChangeSearchIssueId(e: ChangeEvent<HTMLInputElement>) {
        const searchIssueId = e.target.value;

        this.setState({
            searchIssueId: searchIssueId,
        });
    }

    retrieveJiraIssues() {
        JiraIssueDataService.getAll()
            .then((response: any) => {
                this.setState({
                    issues: response.data,
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveJiraIssues();
        this.setState({
            currentIssue: null,
            currentIndex: -1,
        });
    }

    setActiveIssue(issue: IJiraIssueData, index: number) {
        this.setState({
            currentIssue: issue,
            currentIndex: index,
        });
    }

    searchIssueId() {
        this.setState({
            currentIssue: null,
            currentIndex: -1,
        });

        const { searchIssueId } = this.state;
        JiraIssueDataService.findByIssueId(searchIssueId)
            .then((response: any) => {
                const filteredIssues = response.data.filter((issues: IJiraIssueData) =>
                    issues.issue_id.toLowerCase().includes(searchIssueId.toLowerCase())
                );
                this.setState({
                    issues: filteredIssues,
                    currentPage: 1, // Reset to first page
                    lastPage: Math.ceil(filteredIssues.length / 5), // Update last page count
                });
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    render() {
        const {
            searchIssueId,
            issues,
            currentIssue,
            currentIndex,
            currentPage,
            lastPage,
            issuesPerPage,
            exportFormat,
        } = this.state;
        const startIndex = (currentPage - 1) * issuesPerPage;
        const endIndex = Math.min(startIndex + issuesPerPage, issues.length);
        const displayedIssues = issues.slice(startIndex, endIndex);

        const indexOfLastIssue = currentPage * issuesPerPage;
        const indexOfFirstIssue = indexOfLastIssue - issuesPerPage;

        const currentIssues = issues.slice(indexOfFirstIssue, indexOfLastIssue);

        const totalPages = Math.ceil(issues.length / issuesPerPage);

        const paginatedIssues = this.getPaginatedIssues();

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by issue_id"
                            value={searchIssueId}
                            onChange={this.onChangeSearchIssueId}
                        />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" type="button" onClick={this.searchIssueId}>
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-7">
                    <label htmlFor="issues-per-page">Issues per page:</label>
                    <select
                        id="issues-per-page"
                        className="form-select"
                        value={issuesPerPage}
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
                    <h4>Issues List</h4>

                    <nav>
                        <ul className="pagination">
                            {Array.from(Array(totalPages).keys()).map((pageNumber) => (
                                <li
                                    key={pageNumber}
                                    className={"page-item " + (currentPage === pageNumber + 1 ? "active" : "")}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => this.setCurrentPage(pageNumber + 1, issuesPerPage)}
                                    >
                                        {pageNumber + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="container">
                        <Table striped bordered hover className="table-custom">
                            <thead>
                                <tr>
                                    <th>Summary</th>
                                    <th>Description</th>
                                    {/* <th>Id</th> */}
                                    <th>Key</th>
                                    {/* <th>Type name</th> */}
                                    <th>Time spent</th>
                                    <th>Updated</th>
                                    <th>Status</th>
                                    <th>Organization id</th>
                                    <th>User id</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedIssues.map((issue, index) => (
                                    <tr key={index}>
                                        <td>{issue.summary}</td>
                                        <td>{issue.description}</td>
                                        {/* <td>{issue.issue_id}</td> */}
                                        <td>{issue.key}</td>
                                        {/* <td>{issue.nameIssueType}</td> */}
                                        <td>{issue.timespent}</td>
                                        <td>{issue.updated}</td>
                                        <td>{issue.status}</td>
                                        <td>{issue.organizationId}</td>
                                        <td>{issue.userId}</td>
                                        <td>
                                            <Link to={"/jira/issue/" + issue.id} className="badge badge-warning">
                                                Edit
                                            </Link>
                                            <Link to={"/jira/issue/worklog/"} className="badge badge-primary">
                                                View worklogs
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className="col-md-8">
                    Export issues list as :
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
                        <button className="btn btn-outline-success" onClick={this.handleClickExportButton.bind(this)}>
                            Exporter en {this.state.exportFormat}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
