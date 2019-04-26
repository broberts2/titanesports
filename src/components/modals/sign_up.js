import React, { Component } from "react";
import Modal from "react-awesome-modal";
import { AwesomeButton } from "react-awesome-button";
import MediaLink from "../../media_links";
import Loader from "./loader";
import api from "../../utils/api";

export default class SignUp extends Component {
  state = {
    step: 1,
    loader: false,
    username: "",
    password: "",
    confirmPassword: "",
    error: null
  };

  async createUser() {
    this.setState({ loader: true });
    const user = await api.create_user({
      username: this.state.username,
      password: this.state.password
    });
    console.log(user);
    if (user.status_code) {
      this.setState({
        loader: false,
        step: 1,
        error: "We could not match your Titan ID with an existing summoner."
      });
    } else {
      alert("Success!");
    }
  }

  renderLoader() {
    return <Loader />;
  }

  async timeOutCheck(callback) {
    return new Promise(async resolve => {
      setTimeout(() => resolve("Server timed out."), 4000);
      const value = await callback();
      resolve(value);
    });
  }

  async validateUserName() {
    if (this.state.username.length > 0) {
      this.setState({ loader: true });
      const error = await this.timeOutCheck(async () => {
        const user = await api.get_user(this.state.username);
        if (user.error) {
          return null;
        } else {
          return "This account already exists.";
        }
      });
      error
        ? this.setState({ loader: false, error })
        : this.setState({ loader: false, error: null, step: 2 });
    } else {
      this.setState({ error: "Username must be one or more characters long." });
    }
  }

  validatePasswords() {
    if (this.state.password === this.state.confirmPassword) {
      this.setState({ step: 4, error: null });
    } else {
      this.setState({ error: "Passwords don't match." });
    }
  }

  renderStep() {
    switch (this.state.step) {
      case 1:
        return (
          <div>
            <h2>Titan ID</h2>
            <div>
              <input
                type="text"
                value={this.state.username}
                onChange={e => this.setState({ username: e.target.value })}
              />
            </div>
            <h3>
              This will be your Titan eSports username and will be public
              throughout Titan eSports. We ask that you use the same id as your
              League of Legends summoner name so that we can easily verify your
              account and sync your ladder stats to Titan eSports.
            </h3>
            <div className={"button"}>
              <div
                className="linkButton"
                onClick={() => this.validateUserName()}
              >
                Next
              </div>
            </div>
            <h4>{this.state.error}</h4>
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Titan Password</h2>
            <div>
              <input
                type="password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
              />
            </div>
            <h3>
              This will be your hashed Titan eSports password and will only be
              known to you.
            </h3>
            <h3>
              <b>
                We strongly recommend against using the same password associated
                with your League of Legends account.
              </b>
            </h3>
            <a
              href={
                "https://docs.oracle.com/cd/E26180_01/Platform.94/ATGPersProgGuide/html/s0506passwordhashing01.html"
              }
              target={"_blank"}
            >
              Read more about password hashing
            </a>
            <div className={"button"}>
              <div
                className="linkButton"
                onClick={() =>
                  this.state.password.length > 0
                    ? this.setState({ step: 3, error: null })
                    : this.setState({
                        error: "Password must be one or more characters long."
                      })}
                style={{ marginBottom: "15px" }}
              >
                Next
              </div>
              <div
                className="linkButton"
                onClick={() => this.setState({ step: 1 })}
              >
                Back
              </div>
              <h4>{this.state.error}</h4>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h2>Confirm Titan Password</h2>
            <div>
              <input
                type="password"
                value={this.state.confirmPassword}
                onChange={e =>
                  this.setState({ confirmPassword: e.target.value })}
              />
            </div>
            <h3>Confirm your Titan eSports password.</h3>
            <div className={"button"}>
              <div
                className="linkButton"
                onClick={() => this.validatePasswords()}
                style={{ marginBottom: "15px" }}
              >
                Next
              </div>
              <div
                className="linkButton"
                onClick={() => this.setState({ step: 2 })}
              >
                Back
              </div>
              <h4>{this.state.error}</h4>
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <h2>Finalize Account</h2>
            <h3>Confirm account creation?</h3>
            <div className={"button"}>
              <div
                className="linkButton"
                onClick={() => this.createUser()}
                style={{ marginBottom: "15px" }}
              >
                Finalize Account
              </div>
              <div
                className="linkButton"
                onClick={() => this.setState({ step: 3 })}
              >
                Back
              </div>
              <h4>{this.state.error}</h4>
            </div>
          </div>
        );
      case 5:
        return <div />;
    }
  }

  renderRouter() {
    if (this.state.loader) {
      return <Loader />;
    } else {
      return <div className="container">{this.renderStep()}</div>;
    }
  }

  render() {
    return (
      <Modal
        visible={this.props.state.modal === this.props.index ? true : false}
        width={"50%"}
        height={"75%"}
        effect={"fadeInUp"}
        onClickAway={() => {
          this.setState({
            step: 1,
            loader: false,
            username: "",
            password: "",
            confirmPassword: "",
            error: null
          });
          this.props.actions.closeModal();
        }}
      >
        <div className={"modal-style"}>
          <div className="sign-up">{this.renderRouter()}</div>
        </div>
      </Modal>
    );
  }
}
