import React from "react";
import { connect } from "react-redux";
import "./login.css";
import Components from "../../components";

import Api from "../../Api";

class ForgotPassword extends React.Component {
  state = {
    email: ""
  };

  render() {
    return (
      <div>
        <div style={{ marginBottom: "25px" }}>
          <h2>Please enter the email address associated with the account.</h2>
        </div>
        <h2>Email</h2>
        <input
          value={this.state.email}
          onChange={e => this.setState({ email: e.target.value })}
        />
        <button
          style={
            this.state.email.length > 0
              ? {}
              : { pointerEvents: "none", opacity: 0.3 }
          }
          onClick={() =>
            this.state.email.length > 0
              ? this.props.startRequest(
                  Api.emailResetKey({
                    email: this.state.email
                  })
                )
              : null
          }
        >
          Submit
        </button>
      </div>
    );
  }
}

class Login extends React.Component {
  state = {
    domMounted: false,
    u: "",
    p: ""
  };

  componentDidMount() {
    this.setState({ domMounted: true });
  }

  render() {
    return (
      <div>
        <div className={"login"}>
          <h2>Username</h2>
          <input onChange={e => this.setState({ u: e.target.value })} />
          <h2>Password</h2>
          <input
            onChange={e => this.setState({ p: e.target.value })}
            type={"password"}
          />
          <button
            style={
              this.state.u.length > 0 && this.state.p.length > 0
                ? {}
                : { pointerEvents: "none", opacity: 0.3 }
            }
            onClick={() =>
              this.state.u.length > 0 && this.state.p.length > 0
                ? this.props.startRequest(
                    Api.loginUser({
                      username: this.state.u,
                      password: this.state.p
                    })
                  )
                : null
            }
          >
            Login
          </button>
          <div className={"anchor-block"}>
            {!(this.state.u.length > 0 || this.state.p.length > 0) ? (
              <div
                className={"anchor"}
                onClick={() => this.props.openModal(<Components.SignUp />)}
              >
                Don't have an account?
              </div>
            ) : null}
            <div
              className={"anchor"}
              onClick={() => this.props.openModal(<ForgotPassword />)}
            >
              Forgot Password?
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
