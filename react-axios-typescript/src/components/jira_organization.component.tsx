import { Component, ChangeEvent } from "react";
import { RouteComponentProps, Link } from "react-router-dom";

import JiraOrganizationDataService from "../services/jira_organization.service";
import IJiraOrganizationData from "../types/jira_organization.type";

interface RouterProps {
    // type for `match.params`
    id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

type State = {
    currentOrganization: IJiraOrganizationData;
    message: string;
};

export default class JiraOrganization extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.getOrganization = this.getOrganization.bind(this);
        this.updateOrganization = this.updateOrganization.bind(this);
        this.deleteOrganization = this.deleteOrganization.bind(this);

        this.state = {
            currentOrganization: {
                id: null,
                organizationID: "",
                name: "",
            },
            message: "",
        };
    }

    componentDidMount() {
        this.getOrganization(this.props.match.params.id);
    }

    onChangeName(e: ChangeEvent<HTMLInputElement>) {
        const name = e.target.value;

        this.setState((prevState) => ({
            currentOrganization: {
                ...prevState.currentOrganization,
                name: name,
            },
        }));
    }

    getOrganization(id: string) {
        JiraOrganizationDataService.get(id)
            .then((response: any) => {
                this.setState({
                    currentOrganization: response.data,
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    updateOrganization() {
        JiraOrganizationDataService.update(this.state.currentOrganization, this.state.currentOrganization.id)
            .then((response: any) => {
                console.log(response.data);
                this.setState({
                    message: "The organization was updated successfully!",
                });
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    deleteOrganization() {
        JiraOrganizationDataService.delete(this.state.currentOrganization.id)
            .then((response: any) => {
                console.log(response.data);
                this.props.history.push("/jira/organization");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    render() {
        const { currentOrganization } = this.state;

        return (
            <div>
                {currentOrganization ? (
                    <div className="edit-form">
                        <h4>Organization</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="organizationID">Id</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="organizationID"
                                    readOnly
                                    value={currentOrganization.organizationID}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={currentOrganization.name}
                                    onChange={this.onChangeName}
                                />
                            </div>
                        </form>

                        <div className="d-flex justify-content-between">
                            <button type="submit" className="badge badge-success p-2" onClick={this.updateOrganization}>
                                Update
                            </button>

                            <Link to={"/jira/organization"} className="badge badge-warning p-2">
                                Back
                            </Link>

                            <button className="badge badge-danger p-2" onClick={this.deleteOrganization}>
                                Delete
                            </button>
                        </div>

                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Organization...</p>
                    </div>
                )}
            </div>
        );
    }
}
