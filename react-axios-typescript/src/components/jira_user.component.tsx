import { Component, ChangeEvent } from "react";
import { RouteComponentProps } from "react-router-dom";

import JiraUserDataService from "../services/jira_user.service";
import IJiraUserData from "../types/jira_user.type";

interface RouterProps {
    // type for `match.params`
    id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

type State = {
    currentUser: IJiraUserData;
    message: string;
};

export default class JiraUser extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onChangeAccountId = this.onChangeAccountId.bind(this);
        this.onChangeAccountType = this.onChangeAccountType.bind(this);
        this.onChangeEmailAddress = this.onChangeEmailAddress.bind(this);
        this.onChangeDisplayName = this.onChangeDisplayName.bind(this);
        this.getUser = this.getUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);

        this.state = {
            currentUser: {
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
        this.getUser(this.props.match.params.id);
    }

    onChangeAccountId(e: ChangeEvent<HTMLInputElement>) {
        const accountId = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    accountId: accountId,
                },
            };
        });
    }

    onChangeAccountType(e: ChangeEvent<HTMLInputElement>) {
        const accountType = e.target.value;

        this.setState((prevState) => ({
            currentUser: {
                ...prevState.currentUser,
                accountType: accountType,
            },
        }));
    }

    onChangeEmailAddress(e: ChangeEvent<HTMLInputElement>) {
        const emailAddress = e.target.value;

        this.setState((prevState) => ({
            currentUser: {
                ...prevState.currentUser,
                emailAddress: emailAddress,
            },
        }));
    }

    onChangeDisplayName(e: ChangeEvent<HTMLInputElement>) {
        const displayName = e.target.value;

        this.setState((prevState) => ({
            currentUser: {
                ...prevState.currentUser,
                displayName: displayName,
            },
        }));
    }

    getUser(id: string) {
        JiraUserDataService.get(id)
            .then((response: any) => {
                this.setState({
                    currentUser: response.data,
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    updateUser() {
        JiraUserDataService.update(this.state.currentUser, this.state.currentUser.id)
            .then((response: any) => {
                console.log(response.data);
                this.setState({
                    message: "The user was updated successfully!",
                });
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    deleteUser() {
        JiraUserDataService.delete(this.state.currentUser.id)
            .then((response: any) => {
                console.log(response.data);
                this.props.history.push("/jira/user");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    render() {
        const { currentUser } = this.state;

        return (
            <div>
                {currentUser ? (
                    <div className="edit-form">
                        <h4>User</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="accountId">AccountId</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="accountId"
                                    value={currentUser.accountId}
                                    onChange={this.onChangeAccountId}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="accountType">AccountType</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="accountType"
                                    value={currentUser.accountType}
                                    onChange={this.onChangeAccountType}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="emailAddress">EmailAddress</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="emailAddress"
                                    value={currentUser.accountType}
                                    onChange={this.onChangeEmailAddress}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="displayName">DisplayName</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="displayName"
                                    value={currentUser.displayName}
                                    onChange={this.onChangeDisplayName}
                                />
                            </div>
                        </form>

                        <button type="submit" className="badge badge-success" onClick={this.updateUser}>
                            Update
                        </button>

                        <button className="badge badge-danger mr-2" onClick={this.deleteUser}>
                            Delete
                        </button>

                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a User...</p>
                    </div>
                )}
            </div>
        );
    }
}
