import React from "react";
import { connect } from "react-redux";
import Components from "../../components";
import Loader from "../loader/loader";
import "./user_account.css";
import ReactClass from "create-react-class";

import Api from "../../Api";

const config = require("../../config");

class UserAccount extends React.Component {
  state = {
    domMounted: false,
    canEdit: false,
    pageIsValid: false,
    modalVisible: false,
    modal: Components.Logout,
    user: {}
  };

  async componentDidMount() {
    const query = await this.validateQuery();
    if (query) {
      this.setState({ pageIsValid: query });
      setTimeout(() => this.setState({ domMounted: true }), 1000);
    }
  }

  async validateQuery() {
    const res = await Api.validateToken();
    const urlParams = new URLSearchParams(window.location.search);
    let u = urlParams.get("u");
    let user = {};
    if (u) {
      user = await Api.getUser(u);
    } else {
      user = await Api.getUser(res.id);
      window.location = window.location + `?u=${res.id}`;
    }
    this.setState({ user: null });
    this.setState({ user: user.user });
    u = urlParams.get("u");
    if (u === res.id) {
      this.setState({ canEdit: true });
    }
    return user.code === 200;
  }

  setModal(modalVisible) {
    this.setState({ modalVisible });
  }

  openModal(modal) {
    this.setState({ modalVisible: false, modal });
    setTimeout(() => this.setState({ modalVisible: true }), 250);
  }

  editProfileIcon() {
    this.openModal(Components.IconSelect);
  }

  confirmUpdate() {
    const biography = this.refs["player_bio"].children[0].textContent;
    this.openModal(
      ReactClass({
        render() {
          return (
            <div className={"confirm-modal"}>
              <h2>Submit changes to profile?</h2>
              <button
                onClick={async () =>
                  this.props.startRequest(
                    Api.updateUser({
                      biography
                    })
                  )
                }
              >
                Submit Changes
              </button>
            </div>
          );
        }
      })
    );
  }

  clearChanges() {
    const validateQuery = () => this.validateQuery();
    this.openModal(
      ReactClass({
        render() {
          return (
            <div className={"confirm-modal"}>
              <h2>Clear pending changes?</h2>
              <button
                onClick={async () =>
                  this.props.startRequest(
                    new Promise(async (resolve, reject) => {
                      const user = await validateQuery();
                      resolve(
                        user
                          ? { msg: "Changes reverted." }
                          : { msg: "Unable to revert changes." }
                      );
                    })
                  )
                }
              >
                Clear Changes
              </button>
            </div>
          );
        }
      })
    );
  }

  render() {
    return (
      <div className={"user_account"}>
        <Loader domMounted={this.state.domMounted}>
          {this.state.pageIsValid ? (
            <div>
              <Components.Header />
              <Components.Modal
                validateQuery={() => this.validateQuery()}
                width={"45%"}
                height={"75%"}
                openModal={() => this.openModal(Components.Logout)}
                setModal={modalVisible => this.setModal(modalVisible)}
                visible={this.state.modalVisible}
                content={this.state.modal}
              />
              <video muted preload="auto" loop autoPlay>
                <source
                  src={`${config.serverPath}/${
                    this.state.user && this.state.user.profileVideo
                      ? this.state.user.profileVideo
                      : `animated-demacia.webm`
                  }`}
                  type={"video/webm"}
                />
              </video>
              {this.state.canEdit ? (
                <div className={"header-options-wrapper"}>
                  <div className={"header-options"}>
                    <i
                      onClick={() =>
                        this.openModal(Components.UserProfileVideo)
                      }
                      className={"fas fa-fire"}
                    ></i>
                    <i
                      onClick={() => this.openModal(Components.Logout)}
                      className={"fas fa-sign-out-alt"}
                    ></i>
                  </div>
                </div>
              ) : null}
              <div className={"body-wrapper"}>
                <div className={"body"}>
                  <div className={`player_icon`}>
                    <img
                      alt={""}
                      onClick={() =>
                        this.state.canEdit ? this.editProfileIcon() : null
                      }
                      onMouseEnter={() =>
                        this.state.canEdit
                          ? (this.refs.profile_icon.style.opacity = 1)
                          : null
                      }
                      onMouseLeave={() =>
                        this.state.canEdit
                          ? (this.refs.profile_icon.style.opacity = 0)
                          : null
                      }
                      className={`${this.state.canEdit ? "edit" : ""}`}
                      src={`${config.serverPath}/${
                        config.currentVersion
                      }/img/profileicon/${
                        this.state.user ? this.state.user.iconId : "0.png"
                      }`}
                    />
                    <i ref={"profile_icon"} className={"fas fa-edit"}></i>
                  </div>
                  {this.state.user ? (
                    <div className={"title"}>{this.state.user.username}</div>
                  ) : null}
                  <h1>Player Biography</h1>
                  {this.state.user ? (
                    <div ref={"player_bio"}>
                      <Components.TextBox
                        content={this.state.user.biography}
                        canEdit={this.state.canEdit}
                        fontSize={32}
                        fontColor={"white"}
                      />
                    </div>
                  ) : null}
                  {this.state.canEdit ? (
                    <div className={"bottom-icons"}>
                      <i
                        onClick={() => this.confirmUpdate()}
                        className={"fas fa-save"}
                      ></i>
                      <i
                        onClick={() => this.clearChanges()}
                        className={"fas fa-window-close"}
                      ></i>
                    </div>
                  ) : null}
                </div>
              </div>
              <Components.Footer />
            </div>
          ) : (
            <div />
          )}
        </Loader>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserAccount);
