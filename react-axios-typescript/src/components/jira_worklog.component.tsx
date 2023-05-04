import { Component, ChangeEvent } from "react";
import { RouteComponentProps, Link } from "react-router-dom";

import JiraWorklogDataService from "../services/jira_worklog.service";
import IJiraWorklogData from "../types/jira_worklog.type";

interface RouterProps {
    // type for `match.params`
    id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

type State = {
    currentWorklog: IJiraWorklogData;
    message: string;
};

export default class JiraWorklog extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onChangeTimespent = this.onChangeTimespent.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.getWorklog = this.getWorklog.bind(this);
        this.updateWorklog = this.updateWorklog.bind(this);
        this.deleteWorklog = this.deleteWorklog.bind(this);

        this.state = {
            currentWorklog: {
                id: null,
                worklog_id: "",
                issue_id: "",
                creatorId: "",
                timespent: "",
                updated: "",
                description: "",
            },
            message: "",
        };
    }

    componentDidMount() {
        this.getWorklog(this.props.match.params.id);
    }

    onChangeTimespent(e: ChangeEvent<HTMLInputElement>) {
        const timespent = e.target.value;

        this.setState((prevState) => ({
            currentWorklog: {
                ...prevState.currentWorklog,
                timespent: timespent,
            },
        }));
    }

    onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
        const description = e.target.value;

        this.setState((prevState) => ({
            currentWorklog: {
                ...prevState.currentWorklog,
                description: description,
            },
        }));
    }

    getWorklog(id: string) {
        JiraWorklogDataService.get(id)
            .then((response: any) => {
                this.setState({
                    currentWorklog: response.data,
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    updateWorklog() {
        JiraWorklogDataService.update(this.state.currentWorklog, this.state.currentWorklog.id)
            .then((response: any) => {
                console.log(response.data);
                this.setState({
                    message: "The Worklog was updated successfully!",
                });
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    deleteWorklog() {
        JiraWorklogDataService.delete(this.state.currentWorklog.id)
            .then((response: any) => {
                console.log(response.data);
                this.props.history.push("/jira/issue/worklog");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    render() {
        const { currentWorklog } = this.state;

        return (
            <div>
                {currentWorklog ? (
                    <div className="edit-form">
                        <h4>Worklog</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="worklog_id">Id</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="worklog_id"
                                    readOnly
                                    value={currentWorklog.worklog_id}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentWorklog.description}
                                    onChange={this.onChangeDescription}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="timespent">Timespent</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="timespent"
                                    value={currentWorklog.timespent}
                                    onChange={this.onChangeTimespent}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="updated">Updated</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="updated"
                                    readOnly
                                    value={currentWorklog.updated}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="creatorId">Creator Id</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="creatorId"
                                    readOnly
                                    value={currentWorklog.creatorId}
                                />
                            </div>
                        </form>
                        <div className="d-flex justify-content-between">
                            <button type="submit" className="badge badge-success p-2" onClick={this.updateWorklog}>
                                Update
                            </button>

                            <Link to={"/jira/issue/worklog"} className="badge badge-warning p-2">
                                Back
                            </Link>

                            <button className="badge badge-danger p-2" onClick={this.deleteWorklog}>
                                Delete
                            </button>
                        </div>

                        <p>{this.state.message}</p>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a Worklog...</p>
                    </div>
                )}
            </div>
        );
    }
}
