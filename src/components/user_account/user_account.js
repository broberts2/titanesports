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
    pageIsValid: false
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
    u = urlParams.get("u");
    if (u === res.id) {
      this.setState({ canEdit: true });
    }
    return user.code === 200;
  }

  editProfileIcon() {}

  render() {
    return (
      <div className={"user_account"}>
        <Loader domMounted={this.state.domMounted}>
          {this.state.pageIsValid ? (
            <div>
              <Components.Header />
              <video muted preload="auto" loop autoPlay>
                <source
                  src={require("./videos/animated-demacia.webm")}
                  type={"video/webm"}
                />
              </video>
              {this.state.canEdit ? (
                <div className={"logout"}>
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
                  <div className={"title"}>Jetgorilla</div>
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
