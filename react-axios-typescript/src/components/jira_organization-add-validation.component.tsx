import { Component, ChangeEvent } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import JiraOrganizationDataService from "../services/jira_organization.service";
import IJiraOrganizationData from "../types/jira_organization.type";

type Props = {};

type State = IJiraOrganizationData & {
    submitted: boolean;
    successful: boolean;
    message: string;
};

export default class AddJiraOrganization extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.handleAddOrganization = this.handleAddOrganization.bind(this);
        this.saveOrganization = this.saveOrganization.bind(this);
        this.newOrganization = this.newOrganization.bind(this);

        this.state = {
            id: null,
            organizationID: "",
            name: "",
            submitted: false,
            successful: false,
            message: "",
        };
    }

    validationSchema() {
        return Yup.object().shape({
            organizationID: Yup.string()
                .test(
                    "len",
                    "The organizationID must be between 3 and 20 characters.",
                    (val: any) => val && val.toString().length >= 3 && val.toString().length <= 20
                )
                .required("This field is required!"),
            name: Yup.string()
                .test(
                    "len",
                    "The name must be between 3 and 20 characters.",
                    (val: any) => val && val.toString().length >= 3 && val.toString().length <= 20
                )
                .required("This field is required!"),
        });
    }

    handleAddOrganization(formValue: { organizationID: string; name: string }) {

        const data: IJiraOrganizationData = formValue

        this.setState({
            message: "",
            successful: false,
        });

        JiraOrganizationDataService.create(data).then(
            (response: any) => {
                this.setState({
                    id: response.data.id,
                    organizationID: response.data.organizationID,
                    name: response.data.name,
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

    saveOrganization() {
        const data: IJiraOrganizationData = {
            organizationID: this.state.organizationID,
            name: this.state.name,
        };

        this.setState({
            submitted: false,
            message: "",
            successful: false,
        });

        JiraOrganizationDataService.create(data)
            .then((response: any) => {
                this.setState({
                    id: response.data.id,
                    organizationID: response.data.organizationID,
                    name: response.data.name,
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

    newOrganization() {
        this.setState({
            id: null,
            organizationID: "",
            name: "",
            submitted: false,
            successful: false,
            message: ""
        });
    }

    render() {
        const { submitted, organizationID, name, successful, message } = this.state;

        const initialValues = {
            organizationID: "",
            name: "",
        };

        return (
            <div className="submit-form">
                {submitted ? (
                    <div>
                        <h4>You submitted successfully!</h4>
                        <button className="btn btn-success" onClick={this.newOrganization}>
                            Add another organization
                        </button>
                    </div>
                ) : (
                    <div>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={this.validationSchema}
                            onSubmit={this.handleAddOrganization}
                        >
                            <Form>
                                {!successful && (
                                    <div>
                                        <div className="form-group">
                                            <label htmlFor="organizationID"> Organization ID </label>
                                            <Field
                                                name="organizationID"
                                                type="text"
                                                className="form-control"
                                                id="organizationID"
                                            />
                                            <ErrorMessage
                                                name="organizationID"
                                                component="div"
                                                className="alert alert-danger"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="name"> Name </label>
                                            <Field
                                                name="name"
                                                type="texte"
                                                className="form-control"
                                                id="name"
                                            />
                                            <ErrorMessage
                                                name="name"
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
