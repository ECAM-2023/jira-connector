import { Component, ChangeEvent } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import JiraUserDataService from "../services/jira_user.service";
import IJiraUserData from "../types/jira_user.type";

type Props = {};

type State = IJiraUserData & {
    submitted: boolean;
    successful: boolean;
    message: string;
};

export default class AddJiraUser extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.handleAddUser = this.handleAddUser.bind(this);
        this.saveUser = this.saveUser.bind(this);
        this.newUser = this.newUser.bind(this);

        this.state = {
            id: null,
            accountId: "",
            accountType: "",
            emailAddress: "",
            displayName: "",
            submitted: false,
            successful: false,
            message: "",
        };
    }

    validationSchema() {
        return Yup.object().shape({
            accountId: Yup.string()
                .test(
                    "len",
                    "The accountId must be between 3 and 50 characters.",
                    (val: any) => val && val.toString().length >= 3 && val.toString().length <= 40
                )
                .required("This field is required!"),
            accountType: Yup.string()
                .test(
                    "len",
                    "The accountType must be between 3 and 20 characters.",
                    (val: any) => val && val.toString().length >= 3 && val.toString().length <= 20
                )
                .required("This field is required!"),
            emailAddress: Yup.string().email("This is not a valid email.").required("This field is required!"),
            displayName: Yup.string()
                .test(
                    "len",
                    "The name must be between 3 and 20 characters.",
                    (val: any) => val && val.toString().length >= 3 && val.toString().length <= 20
                )
                .required("This field is required!"),
        });
    }

    handleAddUser(formValue: { accountId: string; accountType: string; emailAddress: string; displayName: string }) {

        const data: IJiraUserData = formValue

        this.setState({
            message: "",
            successful: false,
        });

        JiraUserDataService.create(data).then(
            (response: any) => {
                this.setState({
                    id: response.data.id,
                    accountId: response.data.accountId,
                    accountType: response.data.accountType,
                    emailAddress: response.data.emailAddress,
                    displayName: response.data.displayName,
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

    saveUser() {
        const data: IJiraUserData = {
            accountId: this.state.accountId,
            accountType: this.state.accountType,
            emailAddress: this.state.emailAddress,
            displayName: this.state.displayName,
        };

        this.setState({
            submitted: false,
            message: "",
            successful: false,
        });

        JiraUserDataService.create(data)
            .then((response: any) => {
                this.setState({
                    id: response.data.id,
                    accountId: response.data.accountId,
                    accountType: response.data.accountType,
                    emailAddress: response.data.emailAddress,
                    displayName: response.data.displayName,
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

    newUser() {
        this.setState({
            id: null,
            accountId: "",
            accountType: "",
            emailAddress: "",
            displayName: "",
            submitted: false,
            successful: false,
            message: ""
        });
    }

    render() {
        const { submitted, accountId, accountType, emailAddress, displayName, successful, message } = this.state;

        const initialValues = {
            accountId: "",
            accountType: "",
            emailAddress: "",
            displayName: "",
        };

        return (
            <div className="submit-form">
                {submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newUser}>
                            Add another user
                        </button>
                    </div>
                ) : (
                    <div>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={this.validationSchema}
                            onSubmit={this.handleAddUser}
                        >
                            <Form>
                                {!successful && (
                                    <div>
                                        <div className="form-group">
                                            <label htmlFor="accountId"> AccountId </label>
                                            <Field
                                                name="accountId"
                                                type="text"
                                                className="form-control"
                                                id="accountId"
                                            />
                                            <ErrorMessage
                                                name="accountId"
                                                component="div"
                                                className="alert alert-danger"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="accountType"> AccountType </label>
                                            <Field
                                                name="accountType"
                                                type="texte"
                                                className="form-control"
                                                id="accountType"
                                            />
                                            <ErrorMessage
                                                name="accountType"
                                                component="div"
                                                className="alert alert-danger"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="emailAddress"> EmailAddress </label>
                                            <Field
                                                name="emailAddress"
                                                type="email"
                                                className="form-control"
                                                id="emailAddress"
                                            />
                                            <ErrorMessage
                                                name="emailAddress"
                                                component="div"
                                                className="alert alert-danger"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="displayName"> Name </label>
                                            <Field
                                                name="displayName"
                                                type="texte"
                                                className="form-control"
                                                id="displayName"
                                            />
                                            <ErrorMessage
                                                name="displayName"
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
