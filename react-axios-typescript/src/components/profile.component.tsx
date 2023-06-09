import { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import IJiraUser from "../types/jira_user.type";

type Props = {};

type State = {
    redirect: string | null;
    userReady: boolean;
    currentUser: IJiraUser & { accessToken: string };
};
export default class Profile extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: {
                id: null,
                accountId: "",
                accountType: "",
                emailAddress: "",
                displayName: "",
                accessToken: "",
            },
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />;
        }

        const { currentUser } = this.state;

        return (
            <div className="container">
                {this.state.userReady ? (
                    <div>
                        <header className="jumbotron">
                            <h3>
                                <strong>{currentUser.displayName}</strong> Profile
                            </h3>
                        </header>
                        <p>
                            <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
                            {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
                        </p>
                        <p>
                            <strong>Account ID:</strong> {currentUser.accountId}
                        </p>
                        <p>
                            <strong>Email:</strong> {currentUser.emailAddress}
                        </p>
                    </div>
                ) : null}
            </div>
        );
    }
}
