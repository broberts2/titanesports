import React from "react";
import { connect } from "react-redux";
import Components from "../../components";
import Loader from "../loader/loader";
import positionImages from "../../positionImages";
import "./player_search.css";

import Api from "../../Api";

const config = require("../../config");

class Card extends React.Component {
  renderUser() {
    return (
      <tr onClick={() => (window.location = `/user?u=${this.props.user._id}`)}>
        <td>
          <div className={"profile-img"}>
            <img
              src={`${config.serverPath}/${config.currentVersion}/img/profileicon/${this.props.user.iconId}`}
            />
          </div>
        </td>
        <td>
          <div className={"username"}>
            <h3>{this.props.user.username}</h3>
          </div>
        </td>
        <td>
          <div className={"icons"}>
            {this.props.user.leagues.gold ? (
              <div className={"element"}>
                <img
                  src={require("../../img/ranked-emblems/Emblem_Gold.png")}
                />
                <div className={"position"}>
                  {positionImages.gold[this.props.user.leagues.gold]}
                </div>
              </div>
            ) : null}
            {this.props.user.leagues.platinum ? (
              <div className={"element"}>
                <img
                  src={require("../../img/ranked-emblems/Emblem_Platinum.png")}
                />
                <div className={"position"}>
                  {positionImages.platinum[this.props.user.leagues.platinum]}
                </div>
              </div>
            ) : null}
            {this.props.user.leagues.freeAgent ? (
              <div className={"element"}>
                <img src={require("../../img/free_agent.png")} />
                <div className={"position"}>
                  {positionImages.freeAgent[this.props.user.leagues.freeAgent]}
                </div>
              </div>
            ) : null}
          </div>
        </td>
      </tr>
    );
  }

  renderTeam() {}

  render() {
    return this.props.team ? null : this.renderUser();
  }
}

class PlayerSearch extends React.Component {
  state = {
    domMounted: false,
    modalVisible: false,
    modal: Components.Login,
    modalSize: {
      width: "45%",
      height: "75%"
    },
    selectedLeagues: {
      gold: false,
      platinum: false,
      freeAgent: false
    },
    query: "",
    includes: {
      players: true,
      teams: false,
      top: false,
      jun: false,
      mid: false,
      bot: false,
      sup: false,
      sub: false
    },
    users: null,
    teams: null,
    usersList: null,
    teamsList: null
  };

  componentDidMount() {
    this.rebuild("users");
  }

  async rebuild(arg) {
    let users = null;
    let teams = null;
    if (arg === "users") {
      users = await Api.getAllUsers();
    } else {
      teams = await Api.getAllTeams();
    }
    this.buildList(users, teams);
    this.setState({ domMounted: true });
  }

  setModal(modalVisible) {
    this.setState({ modalVisible });
  }

  openModal(modal, size) {
    this.setState({ modalVisible: false, modal, modalSize: size });
    setTimeout(() => this.setState({ modalVisible: true }), 250);
  }

  pickLeague(league, boolean) {
    let selectedLeagues = this.state.selectedLeagues;
    selectedLeagues[league] = boolean;
    this.setState({ selectedLeagues });
    this.buildList(this.state.users, this.state.teams, this.state.query);
  }

  searchValidation(query, user) {
    const search =
      query && query.length > 0
        ? user.username.toLowerCase().includes(query.toLowerCase())
        : true;
    let leagues = false;
    if (
      (this.state.includes.top &&
        ((this.state.selectedLeagues.gold && user.leagues.gold === 1) ||
          (this.state.selectedLeagues.platinum &&
            user.leagues.platinum === 1) ||
          (this.state.selectedLeagues.freeAgent &&
            user.leagues.freeAgent === 1))) ||
      (this.state.includes.jun &&
        ((this.state.selectedLeagues.gold && user.leagues.gold === 2) ||
          (this.state.selectedLeagues.platinum &&
            user.leagues.platinum === 2) ||
          (this.state.selectedLeagues.freeAgent &&
            user.leagues.freeAgent === 2))) ||
      (this.state.includes.mid &&
        ((this.state.selectedLeagues.gold && user.leagues.gold === 3) ||
          (this.state.selectedLeagues.platinum &&
            user.leagues.platinum === 3) ||
          (this.state.selectedLeagues.freeAgent &&
            user.leagues.freeAgent === 3))) ||
      (this.state.includes.bot &&
        ((this.state.selectedLeagues.gold && user.leagues.gold === 4) ||
          (this.state.selectedLeagues.platinum &&
            user.leagues.platinum === 4) ||
          (this.state.selectedLeagues.freeAgent &&
            user.leagues.freeAgent === 4))) ||
      (this.state.includes.sup &&
        ((this.state.selectedLeagues.gold && user.leagues.gold === 5) ||
          (this.state.selectedLeagues.platinum &&
            user.leagues.platinum === 5) ||
          (this.state.selectedLeagues.freeAgent &&
            user.leagues.freeAgent === 5))) ||
      (this.state.includes.sub &&
        ((this.state.selectedLeagues.gold && user.leagues.gold === 6) ||
          (this.state.selectedLeagues.platinum &&
            user.leagues.platinum === 6) ||
          (this.state.selectedLeagues.freeAgent &&
            user.leagues.freeAgent === 6)))
    ) {
      leagues = true;
    }
    return search && leagues;
  }

  buildList(users, teams, query) {
    const noPoro =
      (this.state.includes.top ||
        this.state.includes.jun ||
        this.state.includes.mid ||
        this.state.includes.bot ||
        this.state.includes.sup ||
        this.state.includes.sub) &&
      (this.state.selectedLeagues.gold ||
        this.state.selectedLeagues.platinum ||
        this.state.selectedLeagues.freeAgent);
    const html = users
      ? users.users
          .map(user => {
            if (this.searchValidation(query, user)) {
              return <Card user={user} />;
            } else {
              return null;
            }
          })
          .filter(el => el)
      : null;
    const usersList =
      noPoro && html.length > 0 ? (
        <table cellspacing={"0"} cellpadding={"12px"}>
          <tbody>
            <tr className={"nohover"}>
              <th />
              <th>
                <h3>Username</h3>
              </th>
              <th>
                <h3>Participating Leagues</h3>
              </th>
            </tr>
            {html}
          </tbody>
        </table>
      ) : (
        <div className={"poro"}>
          <img src={require("../../img/poro.png")} />
        </div>
      );
    // const teamsList = teams
    //   ? users.users
    //       .map(user => {
    //         if (
    //           (this.state.selectedLeagues.gold && user.leagues.gold) ||
    //           (this.state.selectedLeagues.platinum && user.leagues.platinum)
    //         ) {
    //           return <Card user={user} />;
    //         } else {
    //           return null;
    //         }
    //       })
    //       .filter(el => el)
    //   : null;
    this.setState({ users, usersList, query });
  }

  setIncludes(key) {
    let includes = this.state.includes;
    includes[key] = !this.state.includes[key];
    this.setState({ includes });
    this.buildList(this.state.users, this.state.teams, this.state.query);
  }

  render() {
    return (
      <Loader domMounted={this.state.domMounted}>
        <Components.Header
          openModal={() =>
            this.openModal(Components.Login, {
              width: "45%",
              height: "75%"
            })
          }
        />
        <div className={"player_search"}>
          <div className={"form"}>
            <div className={"leagues"}>
              <div className={"emblems"}>
                <img
                  onClick={() =>
                    this.pickLeague("gold", !this.state.selectedLeagues.gold)
                  }
                  src={require("../../img/ranked-emblems/Emblem_Gold.png")}
                  style={
                    this.state.selectedLeagues.gold
                      ? {}
                      : {
                          opacity: 0.35
                        }
                  }
                />
                <img
                  onClick={() =>
                    this.pickLeague(
                      "platinum",
                      !this.state.selectedLeagues.platinum
                    )
                  }
                  src={require("../../img/ranked-emblems/Emblem_Platinum.png")}
                  style={
                    this.state.selectedLeagues.platinum
                      ? {}
                      : {
                          opacity: 0.35
                        }
                  }
                />
                <img
                  onClick={() =>
                    this.pickLeague(
                      "freeAgent",
                      !this.state.selectedLeagues.freeAgent
                    )
                  }
                  src={require("../../img/free_agent.png")}
                  style={
                    this.state.selectedLeagues.freeAgent
                      ? {}
                      : {
                          opacity: 0.35
                        }
                  }
                />
              </div>
            </div>
            <input
              onChange={e =>
                this.buildList(
                  this.state.users,
                  this.state.teams,
                  e.target.value
                )
              }
              placeholder={"Search Query"}
            />
            <div className={"checkboxes"}>
              <label className={"checkbox"}>
                Players
                <input
                  type={"checkbox"}
                  checked={this.state.includes.players}
                  onClick={() => {
                    let includes = this.state.includes;
                    includes.players = !this.state.includes.players;
                    this.setState({ includes });
                  }}
                />
                <div className={"checkmark"} />
              </label>
              <label className={"checkbox"} style={{ opacity: 0.35 }}>
                Teams
                <input
                  type={"checkbox"}
                  checked={this.state.includes.teams}
                  onClick={() => {
                    // let includes = this.state.includes;
                    // includes.teams = !this.state.includes.teams;
                    // this.setState({ includes });
                  }}
                />
                <div className={"checkmark"} />
              </label>
            </div>
            <div className={"search-positions"}>
              <img
                onClick={() => this.setIncludes("top")}
                src={positionImages.freeAgent[1].props.src}
                style={
                  this.state.includes.top ? { opacity: 1 } : { opacity: 0.35 }
                }
              />
              <img
                onClick={() => this.setIncludes("jun")}
                src={positionImages.freeAgent[2].props.src}
                style={
                  this.state.includes.jun ? { opacity: 1 } : { opacity: 0.35 }
                }
              />
              <img
                onClick={() => this.setIncludes("mid")}
                src={positionImages.freeAgent[3].props.src}
                style={
                  this.state.includes.mid ? { opacity: 1 } : { opacity: 0.35 }
                }
              />
              <img
                onClick={() => this.setIncludes("bot")}
                src={positionImages.freeAgent[4].props.src}
                style={
                  this.state.includes.bot ? { opacity: 1 } : { opacity: 0.35 }
                }
              />
              <img
                onClick={() => this.setIncludes("sup")}
                src={positionImages.freeAgent[5].props.src}
                style={
                  this.state.includes.sup ? { opacity: 1 } : { opacity: 0.35 }
                }
              />
              <img
                onClick={() => this.setIncludes("sub")}
                src={positionImages.freeAgent[6].props.src}
                style={
                  this.state.includes.sub ? { opacity: 1 } : { opacity: 0.35 }
                }
              />
            </div>
            {this.state.usersList}
          </div>
        </div>
        <Components.Footer />
      </Loader>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayerSearch);
