import { Component, ChangeEvent } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import JiraIssueDataService from "../services/jira_issue.service";
import IJiraIssueData from "../types/jira_issue.type";

type Props = {};

type State = IJiraIssueData & {
    submitted: boolean;
    successful: boolean;
    message: string;
};

export default class JiraIssueAdd extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.handleAddIssue = this.handleAddIssue.bind(this);
        this.saveIssue = this.saveIssue.bind(this);
        this.newIssue = this.newIssue.bind(this);

        this.state = {
            id: null,
            issue_id: "",
            summary: "",
            submitted: false,
            successful: false,
            message: "",
        };
    }

    validationSchema() {
        return Yup.object().shape({
            issue_id: Yup.string()
                .test(
                    "len",
                    "The issue id must be between 3 and 50 characters.",
                    (val: any) => val && val.toString().length >= 3 && val.toString().length <= 50
                )
                .required("This field is required!"),
            summary: Yup.string()
                .test(
                    "len",
                    "The summary must be between 3 and 50 characters.",
                    (val: any) => val && val.toString().length >= 3 && val.toString().length <= 50
                )
                .required("This field is required!"),
        });
    }

    handleAddIssue(formValue: { issue_id: string; summary: string }) {
        const data: IJiraIssueData = formValue;

        this.setState({
            message: "",
            successful: false,
        });

        JiraIssueDataService.create(data).then(
            (response: any) => {
                this.setState({
                    id: response.data.id,
                    issue_id: response.data.issue_id,
                    summary: response.data.summary,
                    submitted: true,
                    message: response.data.message,
                    successful: true,
                });
            },
            (error) => {
                const resMessage =
                    (error.response && error.response.data && error.response.data.message) ||
                    error.message ||
                    error.toString();

                this.setState({
                    submitted: false,
                    successful: false,
                    message: resMessage,
                });
            }
        );
    }

    saveIssue() {
        const data: IJiraIssueData = {
            issue_id: this.state.issue_id,
            summary: this.state.summary,
        };

        this.setState({
            submitted: false,
            message: "",
            successful: false,
        });

        JiraIssueDataService.create(data)
            .then((response: any) => {
                this.setState({
                    id: response.data.id,
                    issue_id: response.data.issue_id,
                    summary: response.data.summary,
                    message: response.data.message,
                    submitted: true,
                    successful: true,
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
                this.setState({
                    successful: false,
                });
            });
    }

    newIssue() {
        this.setState({
            id: null,
            issue_id: "",
            summary: "",
            submitted: false,
            successful: false,
            message: "",
        });
    }

    render() {
        const { submitted, issue_id, summary, successful, message } = this.state;

        const initialValues = {
            issue_id: "",
            summary: "",
        };

        return (
            <div className="submit-form">
                {submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newIssue}>
                            Add another issue
                        </button>
                    </div>
                ) : (
                    <div>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={this.validationSchema}
                            onSubmit={this.handleAddIssue}
                        >
                            <Form>
                                {!successful && (
                                    <div>
                                        <div className="form-group">
                                            <label htmlFor="issue_id"> Issue id </label>
                                            <Field name="issue_id" type="text" className="form-control" id="issue_id" />
                                            <ErrorMessage
                                                name="issue_id"
                                                component="div"
                                                className="alert alert-danger"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="summary"> Summary </label>
                                            <Field name="summary" type="texte" className="form-control" id="summary" />
                                            <ErrorMessage
                                                name="summary"
                                                component="div"
                                                className="alert alert-danger"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary btn-block">
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {message && (
                                    <div className="form-group">
                                        <div
                                            className={successful ? "alert alert-success" : "alert alert-danger"}
                                            role="alert"
                                        >
                                            {message}
                                        </div>
                                    </div>
                                )}
                            </Form>
                        </Formik>
                    </div>
                )}
            </div>
        );
    }
}
