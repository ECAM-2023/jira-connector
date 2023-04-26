import { Component, ChangeEvent } from "react";
import JiraOrganizationDataService from "../services/jira_organization.service";
import IJiraOrganizationData from '../types/jira_organization.type';

type Props = {};

type State = IJiraOrganizationData & {
  submitted: boolean
};

export default class AddJiraOrganization extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeOrganizationID = this.onChangeOrganizationID.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.saveOrganization = this.saveOrganization.bind(this);
    this.newOrganization = this.newOrganization.bind(this);

    this.state = {
      id: null,
      organizationID: "",
      name: "",
      submitted: false
    };
  }

  onChangeOrganizationID(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      organizationID: e.target.value
    });
  }

  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      name: e.target.value
    });
  }


  saveOrganization() {
    const data: IJiraOrganizationData = {
      organizationID: this.state.organizationID,
      name: this.state.name
    };

    JiraOrganizationDataService.create(data)
      .then((response: any) => {
        this.setState({
          id: response.data.id,
          organizationID: response.data.organizationID,
          name: response.data.name,
          submitted: true
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  newOrganization() {
    this.setState({
      id: null,
      organizationID: "",
      name: "",
      submitted: false
    });
  }

  render() {
    const { submitted, organizationID, name } = this.state;

    return (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newOrganization}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="organizationID">organizationID</label>
              <input
                type="text"
                className="form-control"
                id="organizationID"
                required
                value={organizationID}
                onChange={this.onChangeOrganizationID}
                name="organizationID"
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <button onClick={this.saveOrganization} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
