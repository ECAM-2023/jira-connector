import { Component, ChangeEvent } from "react";
import { RouteComponentProps } from "react-router-dom";

import JiraCustomerDataService from "../services/jira_customer.service.";
import IJiraCustomerData from "../types/jira_customer.type";

interface RouterProps {
    // type for `match.params`
    id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

type State = {
    currentCustomer: IJiraCustomerData;
    message: string;
};

export default class JiraCustomer extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onChangeAccountId = this.onChangeAccountId.bind(this);
        this.onChangeAccountType = this.onChangeAccountType.bind(this);
        this.onChangeEmailAddress = this.onChangeEmailAddress.bind(this);
        this.onChangeDisplayName = this.onChangeDisplayName.bind(this);
        this.getCustomer = this.getCustomer.bind(this);
        this.updateCustomer = this.updateCustomer.bind(this);
        this.deleteCustomer = this.deleteCustomer.bind(this);

        this.state = {
            currentCustomer: {
                id: null,
                accountId: "",
                accountType: "",
                emailAddress: "",
                displayName: "",
            },
            message: "",
        };
    }

    componentDidMount() {
        this.getCustomer(this.props.match.params.id);
    }

    onChangeAccountId(e: ChangeEvent<HTMLInputElement>) {
        const accountId = e.target.value;

        this.setState(function (prevState) {
            return {
                currentCustomer: {
                    ...prevState.currentCustomer,
                    accountId: accountId,
                },
            };
        });
    }

    onChangeAccountType(e: ChangeEvent<HTMLInputElement>) {
        const accountType = e.target.value;

        this.setState((prevState) => ({
            currentCustomer: {
                ...prevState.currentCustomer,
                accountType: accountType,
            },
        }));
    }

    onChangeEmailAddress(e: ChangeEvent<HTMLInputElement>) {
        const emailAddress = e.target.value;

        this.setState((prevState) => ({
            currentCustomer: {
                ...prevState.currentCustomer,
                emailAddress: emailAddress,
            },
        }));
    }

    onChangeDisplayName(e: ChangeEvent<HTMLInputElement>) {
        const displayName = e.target.value;

        this.setState((prevState) => ({
            currentCustomer: {
                ...prevState.currentCustomer,
                displayName: displayName,
            },
        }));
    }

    getCustomer(id: string) {
        JiraCustomerDataService.get(id)
            .then((response: any) => {
                this.setState({
                    currentCustomer: response.data,
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    updateCustomer() {
        JiraCustomerDataService.update(this.state.currentCustomer, this.state.currentCustomer.id)
            .then((response: any) => {
                console.log(response.data);
                this.setState({
                    message: "The customer was updated successfully!",
                });
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    deleteCustomer() {
        JiraCustomerDataService.delete(this.state.currentCustomer.id)
            .then((response: any) => {
                console.log(response.data);
                this.props.history.push("/jira/customer");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    render() {
        const { currentCustomer } = this.state;

        return (
            <div>
                {currentCustomer ? (
                    <div className="edit-form">
                        <h4>Customer</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="accountId">AccountId</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="accountId"
                                    value={currentCustomer.accountId}
                                    onChange={this.onChangeAccountId}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="accountType">AccountType</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="accountType"
                                    value={currentCustomer.accountType}
                                    onChange={this.onChangeAccountType}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="emailAddress">EmailAddress</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="emailAddress"
                                    value={currentCustomer.accountType}
                                    onChange={this.onChangeEmailAddress}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="displayName">DisplayName</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="displayName"
                                    value={currentCustomer.displayName}
                                    onChange={this.onChangeDisplayName}
                                />
                            </div>
                        </form>

                        <button type="submit" className="badge badge-success" onClick={this.updateCustomer}>
                            Update
                        </button>

                        <button className="badge badge-danger mr-2" onClick={this.deleteCustomer}>
                            Delete
                        </button>

                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Customer...</p>
                    </div>
                )}
            </div>
        );
    }
}
