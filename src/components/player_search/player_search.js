import React from "react";
import { connect } from "react-redux";
import Components from "../../components";
import Loader from "../loader/loader";
import "./player_search.css";

import Api from "../../Api";

const config = require("../../config");

// <h3>{this.props.user.username}</h3>

class Card extends React.Component {
  render() {
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
              <img src={require("../../img/ranked-emblems/Emblem_Gold.png")} />
            ) : null}
            {this.props.user.leagues.platinum ? (
              <img
                src={require("../../img/ranked-emblems/Emblem_Platinum.png")}
              />
            ) : null}
          </div>
        </td>
      </tr>
    );
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
    query: "",
    selectedLeagues: {
      gold: true,
      platinum: true
    },
    includes: {
      players: true,
      teams: false
    },
    users: null,
    teams: null,
    usersList: null,
    teamsList: null
  };

  async componentDidMount() {
    const users = await Api.getAllUsers();
    this.buildList(users, null);
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
  }

  buildList(users, teams) {
    const usersList = users.users.map(user => <Card user={user} />);
    this.setState({ users, usersList });
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
              </div>
            </div>
            <input placeholder={"Search Query"} />
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
                {this.state.usersList}
              </tbody>
            </table>
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
