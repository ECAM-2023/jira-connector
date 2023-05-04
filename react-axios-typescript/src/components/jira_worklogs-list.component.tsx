import { Component, ChangeEvent } from "react";
import JiraWorklogDataService from "../services/jira_worklog.service";
import { Link } from "react-router-dom";
import IJiraWorklogData from "../types/jira_worklog.type";
import * as XLSX from "xlsx";
import { Table } from "react-bootstrap";

type Props = {};

type State = {
    worklogs: Array<IJiraWorklogData>;
    currentWorklog: IJiraWorklogData | null;
    currentIndex: number;
    searchIssueId: string;
    currentPage: number;
    lastPage: number;
    worklogsPerPage: number;
    exportFormat: string;
};

const WORKLOGS_PER_PAGE = 5;

export default class JiraWorklogsList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.handleClickExportButton = this.handleClickExportButton.bind(this);
        this.onChangeSearchIssueId = this.onChangeSearchIssueId.bind(this);
        this.retrieveJiraIssues = this.retrieveJiraIssues.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveIssue = this.setActiveIssue.bind(this);
        this.searchIssueId = this.searchIssueId.bind(this);

        this.state = {
            worklogs: [],
            currentWorklog: null,
            currentIndex: -1,
            searchIssueId: "",
            currentPage: 1,
            lastPage: 5,
            worklogsPerPage: 5,
            exportFormat: "xlsx",
        };
    }

    handleClickExportButton() {
        // Données à exporter
        const { worklogs } = this.state;

        const data = [
            ["issue_id", "worklog_id", "description", "timespent", "updated", "creatorId"],
            ...worklogs.map((worklog) => [
                worklog.issue_id,
                worklog.worklog_id,
                worklog.description,
                worklog.timespent,
                worklog.updated,
                worklog.creatorId,
            ]),
        ];

        if (this.state.exportFormat === "xlsx") {
            const workbook = XLSX.utils.book_new();

            const worksheet = XLSX.utils.aoa_to_sheet(data);
            XLSX.utils.book_append_sheet(workbook, worksheet, "Worklogs");

            XLSX.writeFile(workbook, "worklogsList.xlsx");
        } else if (this.state.exportFormat === "word") {
            return;
        } else if (this.state.exportFormat === "rst") {
            return;
        }
    }

    getPaginatedIssues() {
        const { worklogs, currentPage } = this.state;
        const startIndex = (currentPage - 1) * WORKLOGS_PER_PAGE;
        const endIndex = startIndex + WORKLOGS_PER_PAGE;
        return worklogs.slice(startIndex, endIndex);
    }

    setCurrentPage(pageNumber: number, worklogsPerPage: number) {
        this.setState({
            currentPage: pageNumber,
            worklogsPerPage: worklogsPerPage,
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
        JiraWorklogDataService.getAll()
            .then((response: any) => {
                this.setState({
                    worklogs: response.data,
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
            currentWorklog: null,
            currentIndex: -1,
        });
    }

    setActiveIssue(worklog: IJiraWorklogData, index: number) {
        this.setState({
            currentWorklog: worklog,
            currentIndex: index,
        });
    }

    searchIssueId() {
        this.setState({
            currentWorklog: null,
            currentIndex: -1,
        });

        const { searchIssueId } = this.state;
        JiraWorklogDataService.findByIssueId(searchIssueId)
            .then((response: any) => {
                const filteredIssues = response.data.filter((worklogs: IJiraWorklogData) =>
                    worklogs.issue_id.toLowerCase().includes(searchIssueId.toLowerCase())
                );
                this.setState({
                    worklogs: filteredIssues,
                    currentPage: 1, // Reset to first page
                    lastPage: Math.ceil(filteredIssues.length / 5), // Update last page count
                });
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    render() {
        const { searchIssueId, worklogs, currentWorklog, currentIndex, currentPage, lastPage, worklogsPerPage } =
            this.state;
        const startIndex = (currentPage - 1) * worklogsPerPage;
        const endIndex = Math.min(startIndex + worklogsPerPage, worklogs.length);
        const displayedIssues = worklogs.slice(startIndex, endIndex);

        const indexOfLastIssue = currentPage * worklogsPerPage;
        const indexOfFirstIssue = indexOfLastIssue - worklogsPerPage;

        const currentIssues = worklogs.slice(indexOfFirstIssue, indexOfLastIssue);

        const totalPages = Math.ceil(worklogs.length / worklogsPerPage);

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
                    <label htmlFor="worklogs-per-page">Worklogs per page:</label>
                    <select
                        id="worklogs-per-page"
                        className="form-select"
                        value={worklogsPerPage}
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
                    <h4>Worklogs list</h4>

                    <nav>
                        <ul className="pagination">
                            {Array.from(Array(totalPages).keys()).map((pageNumber) => (
                                <li
                                    key={pageNumber}
                                    className={"page-item " + (currentPage === pageNumber + 1 ? "active" : "")}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => this.setCurrentPage(pageNumber + 1, worklogsPerPage)}
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
                                    <th>Id</th>
                                    {/* <th>Issue Id</th> */}
                                    <th>Description</th>
                                    <th>Time spent</th>
                                    <th>Updated</th>
                                    <th>Creator id</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedIssues.map((worklog, index) => (
                                    <tr key={index}>
                                        {/* <td>{worklog.issue_id}</td> */}
                                        <td>{worklog.worklog_id}</td>
                                        <td>{worklog.description}</td>
                                        <td>{worklog.timespent}</td>
                                        <td>{worklog.updated}</td>
                                        <td>{worklog.creatorId}</td>
                                        <td>
                                            <Link
                                                to={"/jira/issue/worklog/" + worklog.id}
                                                className="badge badge-warning"
                                            >
                                                Edit
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className="col-md-7">
                    Export worklogs list as :
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
