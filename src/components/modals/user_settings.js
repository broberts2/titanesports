import React, { Component } from "react";
import Modal from "react-awesome-modal";
import { AwesomeButton } from "react-awesome-button";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import api from "../../api";
import { position } from "../../img/img_router";

export default class UserSettings extends Component {
  state = {
    newPassword: "",
    confirmNewPassword: ""
  };

  async getData() {
    const data = await api.get_self();
    this.setState(data);
  }

  componentDidMount() {
    this.getData();
  }

  async save() {
    if (this.passwordCheck() > 0) {
      this.state.password = this.state.newPassword;
      api.update_self(this.state);
    } else {
      let newState = this.state;
      delete newState.newPassword;
      delete newState.confirmNewPassword;
      api.update_self(newState);
    }
  }

  passwordCheck() {
    if (
      this.state.newPassword.length > 0 ||
      this.state.confirmNewPassword.length > 0
    ) {
      if (this.state.newPassword === this.state.confirmNewPassword) {
        return 2;
      } else {
        return 1;
      }
    } else {
      return 0;
    }
  }

  render() {
    return (
      <Modal
        visible={this.props.visible === this.props.index ? true : false}
        width={"55%"}
        height={"90%"}
        effect={"fadeInUp"}
        onClickAway={() => {
          this.setState({
            newPassword: "",
            confirmNewPassword: ""
          });
          this.props.closeModal();
        }}
      >
        <div className={"modal-style"}>
          <div className={"user-settings"}>
            <div
              className={"back-button"}
              onClick={() => {
                this.setState({
                  newPassword: "",
                  confirmNewPassword: ""
                });
                this.props.closeModal();
                this.props.lastModal();
              }}
            >
              <i className="fas fa-arrow-alt-circle-left fa-3x" />
            </div>
            <h1>Profile Settings</h1>
            <div className={"container"}>
              <div className={"element"}>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <h2>Primary Position</h2>
                      </td>
                      <td />
                      <td>
                        <img
                          src={position(
                            this.state.soloTier || "IRON",
                            this.state.titanRole || "TOP"
                          )}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Dropdown
                          options={[
                            "TOP",
                            "JUNGLE",
                            "MIDDLE",
                            "BOTTOM",
                            "SUPPORT"
                          ]}
                          onChange={e => this.setState({ titanRole: e.value })}
                          value={this.state.titanRole || "TOP"}
                          placeholder="Select an option"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <i>This is your declared position for Titan eSports.</i>
              </div>
              <div className={"element"}>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <h2>Password Reset</h2>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input
                          placeholder="New Password"
                          type="password"
                          value={this.state.newPassword}
                          onChange={e =>
                            this.setState({ newPassword: e.target.value })}
                        />
                        <input
                          placeholder="Confirm New Password"
                          value={this.state.confirmNewPassword}
                          type="password"
                          onChange={e =>
                            this.setState({
                              confirmNewPassword: e.target.value
                            })}
                        />
                      </td>
                      <td>
                        <div
                          className={
                            this.passwordCheck() > 1
                              ? "approve-icon"
                              : "deny-icon"
                          }
                        >
                          {this.passwordCheck() > 0 ? (
                            this.passwordCheck() > 1 ? (
                              <div className={"fas fa-check-circle"} />
                            ) : (
                              <div className={"fas fa-times-circle"} />
                            )
                          ) : null}
                        </div>
                      </td>
                      <td />
                    </tr>
                  </tbody>
                </table>
                <i>Reset your Titan eSports password.</i>
              </div>
              <div className={"element"}>
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <div
                          className="linkButton"
                          onClick={() => {
                            this.props.signOut();
                            api.remove_cookie("titan_key");
                            this.props.closeModal();
                          }}
                        >
                          Sign Out
                        </div>
                      </td>
                      <td />
                      <td />
                    </tr>
                  </tbody>
                </table>
                <i>Sign Out of your Titan eSports account.</i>
              </div>
            </div>
            <div
              className={
                this.passwordCheck() > 0
                  ? this.passwordCheck() > 1 ? "button" : "button-deny"
                  : "button"
              }
              onClick={() => {
                this.save();
                this.setState({
                  newPassword: "",
                  confirmNewPassword: ""
                });
                this.props.lastModal();
              }}
            >
              <div className="linkButton">Save</div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
