import React from "react";
import { connect } from "react-redux";
import Components from "../../components";
import Loader from "../loader/loader";
import "./user_account.css";

import Api from "../../Api";

class UserAccount extends React.Component {
  state = {
    domMounted: false,
    canEdit: false,
    pageIsValid: false,
    modalVisible: false,
    modal: Components.Logout,
    user: {
      username: ""
    }
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

  editProfileIcon() {}

  render() {
    return (
      <div className={"user_account"}>
        <Loader domMounted={this.state.domMounted}>
          {this.state.pageIsValid ? (
            <div>
              <Components.Header />
              <Components.Modal
                width={"45%"}
                height={"75%"}
                openModal={() => this.openModal(Components.Logout)}
                setModal={modalVisible => this.setModal(modalVisible)}
                visible={this.state.modalVisible}
                content={this.state.modal}
              />
              <video muted preload="auto" loop autoPlay>
                <source
                  src={require("./videos/animated-demacia.webm")}
                  type={"video/webm"}
                />
              </video>
              {this.state.canEdit ? (
                <div onClick={() => this.setModal(true)} className={"logout"}>
                  <i className={"fas fa-sign-out-alt"}></i>
                </div>
              ) : null}
              <div className={"body-wrapper"}>
                <div className={"body"}>
                  <div className={`player_icon`}>
                    <img
                      onClick={() =>
                        this.state.canEdit ? this.editProfileIcon : null
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
                      src={require("../../img/temp2.png")}
                    />
                    <i ref={"profile_icon"} className={"fas fa-edit"}></i>
                  </div>
                  <div className={"title"}>{this.state.user.username}</div>
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
