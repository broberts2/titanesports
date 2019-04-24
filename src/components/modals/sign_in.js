import React, { Component } from "react";
import Modal from "react-awesome-modal";
import { AwesomeButton } from "react-awesome-button";
import MediaLink from "../../media_links";
import Loader from "./loader";
import api from "../../api";

export default class SignIn extends Component {
  state = {
    username: "",
    password: "",
    response: "",
    loader: false
  };

  async login() {
    this.setState({ loader: true });
    const value = await new Promise(async resolve => {
      setTimeout(() => resolve({ error: "No response from server." }), 4000);
      const response = await api.login_user(
        this.state.username,
        this.state.password
      );
      resolve(response);
    });
    if (value.error) {
      this.setState({ response: value.error, loader: false });
    } else {
      api.create_cookie("titan_key", value);
      this.props.closeModal();
      this.props.showUser(true);
      this.setState({
        username: "",
        password: "",
        response: "",
        loader: false
      });
    }
  }

  renderLoader() {
    return <Loader />;
  }

  renderSignIn() {
    return (
      <div className="container">
        <h2>Username</h2>
        <div>
          <input
            type="text"
            onChange={e => this.setState({ username: e.target.value })}
          />
        </div>
        <h2>Password</h2>
        <div>
          <input
            type="password"
            onChange={e => this.setState({ password: e.target.value })}
          />
        </div>
        <div className="linkButton" onClick={() => this.login()}>
          Sign In
        </div>
        <div className={"account-text"} onClick={() => this.props.newAccount()}>
          Don't have an account?
        </div>
        <center>
          <h3 style={{ color: "rgb(172, 0, 62)", marginTop: "15px" }}>
            {this.state.response}
          </h3>
        </center>
      </div>
    );
  }

  renderSignOut() {
    return (
      <div className="container">
        <div
          className="linkButton"
          onClick={() => {
            this.props.showUser(false);
            api.remove_cookie("titan_key");
          }}
        >
          Sign Out
        </div>
      </div>
    );
  }

  renderRouter() {
    if (this.state.loader) {
      return <Loader />;
    } else {
      return api.get_cookie("titan_key")
        ? this.renderSignOut()
        : this.renderSignIn();
    }
  }

  render() {
    return (
      <Modal
        visible={this.props.visible === this.props.index ? true : false}
        width={"35%"}
        height={"60%"}
        effect={"fadeInUp"}
        onClickAway={() => {
          this.setState({
            username: "",
            password: "",
            response: ""
          });
          this.props.closeModal();
        }}
      >
        <div className={"modal-style"}>
          <div className="sign-in">{this.renderRouter()}</div>
        </div>
      </Modal>
    );
  }
}
