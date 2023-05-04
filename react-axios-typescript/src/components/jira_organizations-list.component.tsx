import { Component, ChangeEvent } from "react";
import JiraOrganizationDataService from "../services/jira_organization.service";
import { Link } from "react-router-dom";
import IJiraOrganizationData from "../types/jira_organization.type";
import * as XLSX from "xlsx";
import { Table } from "react-bootstrap";

type Props = {};

type State = {
    organizations: Array<IJiraOrganizationData>;
    currentOrganization: IJiraOrganizationData | null;
    currentIndex: number;
    searchOrganizationID: string;
    currentPage: number;
    lastPage: number;
    organizationsPerPage: number;
    exportFormat: string;
};

const ORGANIZATIONS_PER_PAGE = 5;

export default class JiraOrganizationsList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.handleClickExportButton = this.handleClickExportButton.bind(this);
        this.onChangeSearchOrganizationID = this.onChangeSearchOrganizationID.bind(this);
        this.retrieveJiraOrganizations = this.retrieveJiraOrganizations.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveOrganization = this.setActiveOrganization.bind(this);
        this.searchOrganizationID = this.searchOrganizationID.bind(this);

        this.state = {
            organizations: [],
            currentOrganization: null,
            currentIndex: -1,
            searchOrganizationID: "",
            currentPage: 1,
            lastPage: 5,
            organizationsPerPage: 5,
            exportFormat: "xlsx",
        };
    }

    handleClickExportButton() {
        // Données à exporter
        const { organizations } = this.state;

        const data = [
            ["organizationID", "name"],
            ...organizations.map((organization) => [organization.organizationID, organization.name]),
        ];

        if (this.state.exportFormat === "xlsx") {
            const workbook = XLSX.utils.book_new();

            const worksheet = XLSX.utils.aoa_to_sheet(data);
            XLSX.utils.book_append_sheet(workbook, worksheet, "Organizations");

            XLSX.writeFile(workbook, "organizationsList.xlsx");
        } else if (this.state.exportFormat === "word") {
            return;
        } else if (this.state.exportFormat === "rst") {
            return;
        }
    }

    getPaginatedOrganizations() {
        const { organizations, currentPage } = this.state;
        const startIndex = (currentPage - 1) * ORGANIZATIONS_PER_PAGE;
        const endIndex = startIndex + ORGANIZATIONS_PER_PAGE;
        return organizations.slice(startIndex, endIndex);
    }

    setCurrentPage(pageNumber: number, organizationsPerPage: number) {
        this.setState({
            currentPage: pageNumber,
            organizationsPerPage: organizationsPerPage,
        });
    }

    componentDidMount() {
        this.retrieveJiraOrganizations();
    }

    onChangeSearchOrganizationID(e: ChangeEvent<HTMLInputElement>) {
        const searchOrganizationID = e.target.value;

        this.setState({
            searchOrganizationID: searchOrganizationID,
        });
    }

    retrieveJiraOrganizations() {
        JiraOrganizationDataService.getAll()
            .then((response: any) => {
                this.setState({
                    organizations: response.data,
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveJiraOrganizations();
        this.setState({
            currentOrganization: null,
            currentIndex: -1,
        });
    }

    setActiveOrganization(organization: IJiraOrganizationData, index: number) {
        this.setState({
            currentOrganization: organization,
            currentIndex: index,
        });
    }

    searchOrganizationID() {
        this.setState({
            currentOrganization: null,
            currentIndex: -1,
        });

        const { searchOrganizationID } = this.state;
        JiraOrganizationDataService.findByOrganizationID(searchOrganizationID)
            .then((response: any) => {
                const filteredOrganizations = response.data.filter((organization: IJiraOrganizationData) =>
                    organization.organizationID.toLowerCase().includes(searchOrganizationID.toLowerCase())
                );
                this.setState({
                    organizations: filteredOrganizations,
                    currentPage: 1, // Reset to first page
                    lastPage: Math.ceil(filteredOrganizations.length / 5), // Update last page count
                });
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    render() {
        const {
            searchOrganizationID,
            organizations,
            currentOrganization,
            currentIndex,
            currentPage,
            lastPage,
            organizationsPerPage,
            exportFormat,
        } = this.state;
        const startIndex = (currentPage - 1) * organizationsPerPage;
        const endIndex = Math.min(startIndex + organizationsPerPage, organizations.length);
        const displayedOrganizations = organizations.slice(startIndex, endIndex);

        const indexOfLastOrganization = currentPage * organizationsPerPage;
        const indexOfFirstOrganization = indexOfLastOrganization - organizationsPerPage;

        const totalPages = Math.ceil(organizations.length / organizationsPerPage);

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by organizationID"
                            value={searchOrganizationID}
                            onChange={this.onChangeSearchOrganizationID}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchOrganizationID}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-7">
                    <label htmlFor="organizations-per-page">Organizations per page :</label>
                    <select
                        id="organizations-per-page"
                        className="form-select"
                        value={organizationsPerPage}
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
                    <h4>Organizations List</h4>

                    <nav>
                        <ul className="pagination">
                            {Array.from(Array(totalPages).keys()).map((pageNumber) => (
                                <li
                                    key={pageNumber}
                                    className={"page-item " + (currentPage === pageNumber + 1 ? "active" : "")}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => this.setCurrentPage(pageNumber + 1, organizationsPerPage)}
                                    >
                                        {pageNumber + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="container">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>id</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayedOrganizations.map((organization, index) => (
                                    <tr key={index}>
                                        <td>{organization.name}</td>
                                        <td>{organization.organizationID}</td>
                                        <td>
                                            <Link
                                                to={"/jira/organization/" + organization.id}
                                                className="badge badge-warning"
                                            >
                                                Edit
                                            </Link>
                                            <Link to={"/jira/viewco"} className="badge badge-primary">
                                                View customers
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className="col-md-7">
                    Export organizations list as :
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
