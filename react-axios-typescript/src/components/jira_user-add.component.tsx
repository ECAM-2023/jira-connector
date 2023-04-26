import { Component, ChangeEvent } from "react";
import JiraUserDataService from "../services/jira_user.service";
import IJiraUserData from '../types/jira_user.type';

type Props = {};

type State = IJiraUserData & {
  submitted: boolean
};

export default class AddJiraUser extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeAccountId = this.onChangeAccountId.bind(this);
    this.onChangeAccountType = this.onChangeAccountType.bind(this);
    this.onChangeEmailAddress = this.onChangeEmailAddress.bind(this);
    this.onChangeDisplayName = this.onChangeDisplayName.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);

    this.state = {
      id: null,
      accountId: "",
      accountType: "",
      emailAddress: "",
      displayName: "",
      submitted: false
    };
  }

  onChangeAccountId(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      accountId: e.target.value
    });
  }

  onChangeAccountType(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      accountType: e.target.value
    });
  }

  onChangeEmailAddress(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      emailAddress: e.target.value
    });
  }

  onChangeDisplayName(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      displayName: e.target.value
    });
  }

  saveUser() {
    const data: IJiraUserData = {
      accountId: this.state.accountId,
      accountType: this.state.accountType,
      emailAddress: this.state.emailAddress,
      displayName: this.state.displayName
    };

    JiraUserDataService.create(data)
      .then((response: any) => {
        this.setState({
          id: response.data.id,
          accountId: response.data.accountId,
          accountType: response.data.accountType,
          emailAddress: response.data.emailAddress,
          displayName: response.data.displayName,
          submitted: true
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  newUser() {
    this.setState({
      id: null,
      accountId: "",
      accountType: "",
      emailAddress: "",
      displayName: "",
      submitted: false
    });
  }

  render() {
    const { submitted, accountId, accountType, emailAddress, displayName } = this.state;

    return (
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newUser}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="accountId">AccountId</label>
              <input
                type="text"
                className="form-control"
                id="accountId"
                required
                value={accountId}
                onChange={this.onChangeAccountId}
                name="accountId"
              />
            </div>

            <div className="form-group">
              <label htmlFor="accountType">AccountType</label>
              <input
                type="text"
                className="form-control"
                id="accountType"
                required
                value={accountType}
                onChange={this.onChangeAccountType}
                name="accountType"
              />
            </div>

            <div className="form-group">
              <label htmlFor="emailAddress">EmailAddress</label>
              <input
                type="text"
                className="form-control"
                id="emailAddress"
                required
                value={emailAddress}
                onChange={this.onChangeEmailAddress}
                name="emailAddress"
              />
            </div>

            <div className="form-group">
              <label htmlFor="displayName">DisplayName</label>
              <input
                type="text"
                className="form-control"
                id="displayName"
                required
                value={displayName}
                onChange={this.onChangeDisplayName}
                name="displayName"
              />
            </div>

            <button onClick={this.saveUser} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
