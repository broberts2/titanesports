import React from "react";
import { connect } from "react-redux";
import Components from "../../components";
import Loader from "../loader/loader";
import positionImages from "../../positionImages";
import "./user_account.css";
import ReactClass from "create-react-class";
import "react-dropdown/style.css";

import Api from "../../Api";

const config = require("../../config");

class UserAccount extends React.Component {
  state = {
    domMounted: false,
    canEdit: false,
    pageIsValid: false,
    modalVisible: false,
    freeAgentRoll: 1,
    freeAgentButton: false,
    positionPreview: positionImages.freeAgent[1],
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
    this.setState({
      user: user.user,
      freeAgentRoll: user.user.leagues.freeAgent,
      freeAgentButton: user.user.leagues.freeAgent,
      positionPreview: positionImages.freeAgent[user.user.leagues.freeAgent]
    });
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
    let leagues = this.state.user.leagues;
    leagues.freeAgent = !this.state.freeAgentButton
      ? 0
      : this.state.freeAgentRoll;
    this.openModal(
      ReactClass({
        render() {
          return (
            <div className={"confirm-modal"}>
              <h2>Submit changes to profile?</h2>
              <button
                onClick={async () => {
                  this.props.startRequest(
                    Api.updateUser({
                      leagues,
                      biography
                    })
                  );
                }}
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

  setFreeAgentRoll(roll) {
    this.setState({
      freeAgentRoll: roll,
      positionPreview: positionImages.freeAgent[roll]
    });
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
                    <div className={"title"}>
                      {this.state.user.username}
                      <h3
                        style={
                          this.state.user.isAdmin
                            ? { color: "#ff7a00" }
                            : { color: "#6b46ff" }
                        }
                      >
                        {this.state.user.communityTitle}
                      </h3>
                      {positionImages[this.state.user.leagues.gold]}
                    </div>
                  ) : null}
                  <div className={"emblems"}>
                    {this.state.user && this.state.user.leagues.gold ? (
                      <div className={"element"}>
                        <img
                          src={require("../../img/ranked-emblems/Emblem_Gold.png")}
                        />
                        <div className={"position"}>
                          {positionImages.gold[this.state.user.leagues.gold]}
                        </div>
                      </div>
                    ) : null}
                    {this.state.user && this.state.user.leagues.platinum ? (
                      <div className={"element"}>
                        <img
                          src={require("../../img/ranked-emblems/Emblem_Platinum.png")}
                        />
                        <div className={"position"}>
                          {
                            positionImages.platinum[
                              this.state.user.leagues.platinum
                            ]
                          }
                        </div>
                      </div>
                    ) : null}
                    {this.state.user && this.state.user.leagues.freeAgent ? (
                      <div className={"element"}>
                        <img src={require("../../img/free_agent.png")} />
                        <div className={"position"}>
                          {
                            positionImages.freeAgent[
                              this.state.user.leagues.freeAgent
                            ]
                          }
                        </div>
                      </div>
                    ) : null}
                  </div>
                  {this.state.user && this.state.user.opgg ? (
                    <div>
                      <h1>OP.GG Profile</h1>
                      <a href={this.state.user.opgg} target={"_blank"}>
                        {this.state.user.opgg}
                      </a>
                    </div>
                  ) : null}
                  {this.state.user && this.state.canEdit ? (
                    <div className={"free-agent"}>
                      <h1>Free Agent Check</h1>
                      <h4>
                        Becoming a free agent is a great way to find a team,
                        especially if you're new to the league or flying solo.
                        Doing so will list you as a free agent for recruitment
                        on the player/team search page. Click the image to
                        toggle and select a position to designate your desired
                        roll!
                      </h4>
                      <h3
                        style={
                          this.state.freeAgentButton
                            ? { color: "rgb(53, 128, 119)" }
                            : { color: "rgb(113, 4, 34)" }
                        }
                      >
                        {this.state.freeAgentButton ? "ENABLED" : "DISABLED"}
                      </h3>
                      <div className={"block"}>
                        <div className="main">
                          <img
                            style={
                              this.state.freeAgentButton
                                ? { opacity: 1 }
                                : { opacity: 0.35 }
                            }
                            onClick={() =>
                              this.setState({
                                freeAgentButton: !this.state.freeAgentButton
                              })
                            }
                            src={require("../../img/free_agent.png")}
                          />
                        </div>
                        <div
                          className={"preview"}
                          style={
                            this.state.freeAgentButton
                              ? { opacity: 1 }
                              : { opacity: 0.35 }
                          }
                        >
                          {this.state.positionPreview}
                        </div>
                        <div className={"rolls"}>
                          <div
                            onClick={() => this.setFreeAgentRoll(1)}
                            className={"item"}
                            style={
                              this.state.freeAgentButton
                                ? { opacity: 1 }
                                : { opacity: 0.35, pointerEvents: "none" }
                            }
                          >
                            {positionImages.freeAgent[1]}
                          </div>
                          <div
                            onClick={() => this.setFreeAgentRoll(2)}
                            className={"item"}
                            style={
                              this.state.freeAgentButton
                                ? { opacity: 1 }
                                : { opacity: 0.35, pointerEvents: "none" }
                            }
                          >
                            {positionImages.freeAgent[2]}
                          </div>
                          <div
                            onClick={() => this.setFreeAgentRoll(3)}
                            className={"item"}
                            style={
                              this.state.freeAgentButton
                                ? { opacity: 1 }
                                : { opacity: 0.35, pointerEvents: "none" }
                            }
                          >
                            {positionImages.freeAgent[3]}
                          </div>
                          <div
                            onClick={() => this.setFreeAgentRoll(4)}
                            className={"item"}
                            style={
                              this.state.freeAgentButton
                                ? { opacity: 1 }
                                : { opacity: 0.35, pointerEvents: "none" }
                            }
                          >
                            {positionImages.freeAgent[4]}
                          </div>
                          <div
                            onClick={() => this.setFreeAgentRoll(5)}
                            className={"item"}
                            style={
                              this.state.freeAgentButton
                                ? { opacity: 1 }
                                : { opacity: 0.35, pointerEvents: "none" }
                            }
                          >
                            {positionImages.freeAgent[5]}
                          </div>
                          <div
                            onClick={() => this.setFreeAgentRoll(6)}
                            className={"item"}
                            style={
                              this.state.freeAgentButton
                                ? { opacity: 1 }
                                : { opacity: 0.35, pointerEvents: "none" }
                            }
                          >
                            {positionImages.freeAgent[6]}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                  {this.state.user &&
                  (this.state.canEdit || this.state.user.biography.length) >
                    0 ? (
                    <div>
                      <h1>Player Biography</h1>
                      <div ref={"player_bio"}>
                        <Components.TextBox
                          placeholder={"(Optional)"}
                          content={this.state.user.biography}
                          canEdit={this.state.canEdit}
                          fontSize={32}
                          fontColor={"white"}
                        />
                      </div>
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
