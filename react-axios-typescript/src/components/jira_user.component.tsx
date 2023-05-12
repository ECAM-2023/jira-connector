import { Component, ChangeEvent } from "react";
import { RouteComponentProps, Link } from "react-router-dom";

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
                                    readOnly
                                    value={currentUser.accountId}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="accountType">AccountType</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="accountType"
                                    readOnly
                                    value={currentUser.accountType}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="emailAddress">EmailAddress</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="emailAddress"
                                    readOnly
                                    value={currentUser.accountType}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="displayName">DisplayName</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="displayName"
                                    readOnly
                                    value={currentUser.displayName}
                                    onChange={this.onChangeDisplayName}
                                />
                            </div>
                        </form>
                        <div className="d-flex justify-content-between">
                            <Link to={"/jira/user"} className="badge badge-warning p-2">
                                Back
                            </Link>

                            <button className="badge badge-danger p-2" onClick={this.deleteUser}>
                                Delete
                            </button>
                        </div>

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
