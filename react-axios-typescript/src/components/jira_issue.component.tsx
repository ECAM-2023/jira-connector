import { Component, ChangeEvent } from "react";
import { RouteComponentProps, Link } from "react-router-dom";

import JiraIssueDataService from "../services/jira_issue.service";
import IJiraIssueData from "../types/jira_issue.type";

interface RouterProps {
    // type for `match.params`
    id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

type State = {
    currentIssue: IJiraIssueData;
    message: string;
};

export default class JiraIssue extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.getIssue = this.getIssue.bind(this);
        this.updateIssue = this.updateIssue.bind(this);
        this.deleteIssue = this.deleteIssue.bind(this);

        this.state = {
            currentIssue: {
                id: null,
                issue_id: "",
                key: "",
                nameIssueType: "",
                timespent: "",
                updated: "",
                description: "",
                status: "",
                summary: "",
                userId: "",
                organizationId: "",
            },
            message: "",
        };
    }

    componentDidMount() {
        this.getIssue(this.props.match.params.id);
    }

    getIssue(id: string) {
        JiraIssueDataService.get(id)
            .then((response: any) => {
                this.setState({
                    currentIssue: response.data,
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    updateIssue() {
        JiraIssueDataService.update(this.state.currentIssue, this.state.currentIssue.id)
            .then((response: any) => {
                console.log(response.data);
                this.setState({
                    message: "The Issue was updated successfully!",
                });
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    deleteIssue() {
        JiraIssueDataService.delete(this.state.currentIssue.id)
            .then((response: any) => {
                console.log(response.data);
                this.props.history.push("/jira/issue");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    render() {
        const { currentIssue } = this.state;

        return (
            <div>
                {currentIssue ? (
                    <div className="edit-form">
                        <h4>Issue</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="issue_id">Issue id</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="issue_id"
                                    readOnly
                                    value={currentIssue.issue_id}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="key">Key</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="key"
                                    readOnly
                                    value={currentIssue.key}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="nameIssueType">Type name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nameIssueType"
                                    readOnly
                                    value={currentIssue.nameIssueType}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="timespent">Time spent</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="timespent"
                                    readOnly
                                    value={currentIssue.timespent}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="updated">Last update</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="updated"
                                    readOnly
                                    value={currentIssue.updated}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    readOnly
                                    value={currentIssue.description}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="status">Status</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="status"
                                    readOnly
                                    value={currentIssue.status}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="summary">Summary</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="summary"
                                    readOnly
                                    value={currentIssue.summary}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userId">User id</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="userId"
                                    readOnly
                                    value={currentIssue.userId}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="organizationId">Organization id</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="organizationId"
                                    readOnly
                                    value={currentIssue.organizationId}
                                />
                            </div>
                        </form>
                        <div className="d-flex justify-content-between">
                            <Link to={"/jira/issue"} className="badge badge-warning p-2">
                                Back
                            </Link>

                            <button className="badge badge-danger p-2" onClick={this.deleteIssue}>
                                Delete
                            </button>
                        </div>

                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on an Issue...</p>
                    </div>
                )}
            </div>
        );
    }
}
