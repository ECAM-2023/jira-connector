import { Component, ChangeEvent } from "react";
import JiraCustomerDataService from "../services/jira_customer.service";
import { Link } from "react-router-dom";
import IJiraCustomerData from "../types/jira_customer.type";

type Props = {};

type State = {
    customers: Array<IJiraCustomerData>;
    currentCustomer: IJiraCustomerData | null;
    currentIndex: number;
    searchAccountId: string;
    currentPage: number;
    lastPage: number;
    customersPerPage: number;
};

const CUSTOMERS_PER_PAGE = 5;

export default class JiraCustomersList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onChangeSearchAccountId = this.onChangeSearchAccountId.bind(this);
        this.retrieveJiraCustomers = this.retrieveJiraCustomers.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveCustomer = this.setActiveCustomer.bind(this);
        this.searchAccountId = this.searchAccountId.bind(this);

        this.state = {
            customers: [],
            currentCustomer: null,
            currentIndex: -1,
            searchAccountId: "",
            currentPage: 1,
            lastPage: 5,
            customersPerPage: 5,
        };
    }

    getPaginatedCustomers() {
        const { customers, currentPage } = this.state;
        const startIndex = (currentPage - 1) * CUSTOMERS_PER_PAGE;
        const endIndex = startIndex + CUSTOMERS_PER_PAGE;
        return customers.slice(startIndex, endIndex);
    }

    setCurrentPage(pageNumber: number, customersPerPage: number) {
        this.setState({
            currentPage: pageNumber,
            customersPerPage: customersPerPage,
        });
    }

    componentDidMount() {
        this.retrieveJiraCustomers();
    }

    onChangeSearchAccountId(e: ChangeEvent<HTMLInputElement>) {
        const searchAccountId = e.target.value;

        this.setState({
            searchAccountId: searchAccountId,
        });
    }

    retrieveJiraCustomers() {
        JiraCustomerDataService.getAll()
            .then((response: any) => {
                this.setState({
                    customers: response.data,
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveJiraCustomers();
        this.setState({
            currentCustomer: null,
            currentIndex: -1,
        });
    }

    setActiveCustomer(customer: IJiraCustomerData, index: number) {
        this.setState({
            currentCustomer: customer,
            currentIndex: index,
        });
    }

    searchAccountId() {
        this.setState({
            currentCustomer: null,
            currentIndex: -1,
        });

        const { searchAccountId } = this.state;
        JiraCustomerDataService.findByAccountId(searchAccountId)
            .then((response: any) => {
                const filteredCustomers = response.data.filter((customers: IJiraCustomerData) =>
                    customers.accountId.toLowerCase().includes(searchAccountId.toLowerCase())
                );
                this.setState({
                    customers: filteredCustomers,
                    currentPage: 1, // Reset to first page
                    lastPage: Math.ceil(filteredCustomers.length / 5), // Update last page count
                });
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    render() {
        const { searchAccountId, customers, currentCustomer, currentIndex, currentPage, lastPage, customersPerPage } =
            this.state;
        const startIndex = (currentPage - 1) * customersPerPage;
        const endIndex = Math.min(startIndex + customersPerPage, customers.length);
        const displayedCustomers = customers.slice(startIndex, endIndex);

        const indexOfLastCustomer = currentPage * customersPerPage;
        const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;

        const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

        const totalPages = Math.ceil(customers.length / customersPerPage);

        const paginatedCustomers = this.getPaginatedCustomers();

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
                    <label htmlFor="customers-per-page">Customers per page:</label>
                    <select
                        id="customers-per-page"
                        className="form-select"
                        value={customersPerPage}
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
                    <h4>Customers List</h4>

                    <nav>
                        <ul className="pagination">
                            {Array.from(Array(totalPages).keys()).map((pageNumber) => (
                                <li
                                    key={pageNumber}
                                    className={"page-item " + (currentPage === pageNumber + 1 ? "active" : "")}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => this.setCurrentPage(pageNumber + 1, customersPerPage)}
                                    >
                                        {pageNumber + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <ul className="list-group">
                        {displayedCustomers &&
                            displayedCustomers.map((customer: IJiraCustomerData, index: number) => (
                                <li
                                    className={"list-group-item " + (index === currentIndex ? "active" : "")}
                                    onClick={() => this.setActiveCustomer(customer, index)}
                                    key={index}
                                >
                                    {customer.displayName}
                                </li>
                            ))}
                    </ul>
                </div>

                <div className="col-md-6">
                    {currentCustomer ? (
                        <div>
                            <h4>Customer</h4>
                            <div>
                                <label>
                                    <strong>AccountId:</strong>
                                </label>{" "}
                                {currentCustomer.accountId}
                            </div>
                            <div>
                                <label>
                                    <strong>AccountType:</strong>
                                </label>{" "}
                                {currentCustomer.accountType}
                            </div>
                            <div>
                                <label>
                                    <strong>Email Address:</strong>
                                </label>{" "}
                                {currentCustomer.emailAddress}
                            </div>
                            <div>
                                <label>
                                    <strong>Name:</strong>
                                </label>{" "}
                                {currentCustomer.displayName}
                            </div>
                            <Link to={"/jira/customer/" + currentCustomer.id} className="badge badge-warning">
                                Edit
                            </Link>
                            <Link to={"/jira/issue/" + currentCustomer.id} className="badge badge-primary">
                                View issues
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a Customer...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
