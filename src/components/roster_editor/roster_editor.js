import React from "react";
import { connect } from "react-redux";
import Components from "../../components";
import positionImages from "../../positionImages";
import "./roster_editor.css";

import Api from "../../Api";

const config = require("../../config");

class RoleSelect extends React.Component {
  state = {
    "1": false,
    "2": false,
    "3": false,
    "4": false,
    "5": false,
    "6": false,
    role: 0
  };

  setRole(pos) {
    let state = {
      "1": false,
      "2": false,
      "3": false,
      "4": false,
      "5": false,
      "6": false,
      role: pos
    };
    state[pos] = true;
    this.setState(state);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.player.role !== prevProps.player.role) {
      this.setRole(this.props.player.role);
    }
  }

  componentDidMount() {
    this.setRole(this.props.player.role);
  }

  render() {
    return (
      <div className={"modal"}>
        <h2>Change player role</h2>
        <div className={"roles"}>
          <div
            onClick={() => this.setRole(1)}
            style={
              this.state[1]
                ? { opacity: 1 }
                : {
                    opacity: 0.35
                  }
            }
            className={"item"}
          >
            {
              positionImages[
                this.props.team.league === 1 ? "gold" : "platinum"
              ][1]
            }
          </div>
          <div
            onClick={() => this.setRole(2)}
            style={
              this.state[2]
                ? { opacity: 1 }
                : {
                    opacity: 0.35
                  }
            }
            className={"item"}
          >
            {
              positionImages[
                this.props.team.league === 1 ? "gold" : "platinum"
              ][2]
            }
          </div>
          <div
            onClick={() => this.setRole(3)}
            style={
              this.state[3]
                ? { opacity: 1 }
                : {
                    opacity: 0.35
                  }
            }
            className={"item"}
          >
            {
              positionImages[
                this.props.team.league === 1 ? "gold" : "platinum"
              ][3]
            }
          </div>
          <div
            onClick={() => this.setRole(4)}
            style={
              this.state[4]
                ? { opacity: 1 }
                : {
                    opacity: 0.35
                  }
            }
            className={"item"}
          >
            {
              positionImages[
                this.props.team.league === 1 ? "gold" : "platinum"
              ][4]
            }
          </div>
          <div
            onClick={() => this.setRole(5)}
            style={
              this.state[5]
                ? { opacity: 1 }
                : {
                    opacity: 0.35
                  }
            }
            className={"item"}
          >
            {
              positionImages[
                this.props.team.league === 1 ? "gold" : "platinum"
              ][5]
            }
          </div>
          <div
            onClick={() => this.setRole(6)}
            style={
              this.state[6]
                ? { opacity: 1 }
                : {
                    opacity: 0.35
                  }
            }
            className={"item"}
          >
            {
              positionImages[
                this.props.team.league === 1 ? "gold" : "platinum"
              ][6]
            }
          </div>
        </div>
        <button
          onClick={() =>
            this.props.startRequest(
              new Promise(async (resolve, reject) => {
                let user = await Api.getUser(this.props.player.id);
                user = user.user;
                user.leagues[
                  this.props.team.league === 1 ? "gold" : "platinum"
                ] = this.state.role;
                let team = this.props.team;
                team.members[this.props.player.id].role = this.state.role;
                const res = await this.props.update({
                  player: user,
                  team
                });
                resolve(res);
              })
            )
          }
        >
          Submit Changes
        </button>
      </div>
    );
  }
}

class Captain extends React.Component {
  state = {};

  componentDidMount() {}

  render() {
    return (
      <div className={"modal"}>
        <button
          onClick={() =>
            this.props.startRequest(
              new Promise(async (resolve, reject) => {
                if (this.props.team.captain) {
                  let lastUser = await Api.getUser(this.props.team.captain);
                  lastUser = lastUser.user;
                  if (lastUser.captainTeam) {
                    delete lastUser.captainTeam[
                      this.props.team.league === 1 ? "gold" : "platinum"
                    ][this.props.team._id];
                    await Api.updateUser(this.props.team.captain, lastUser);
                  }
                }
                let user = await Api.getUser(this.props.player.id);
                user = user.user;
                if (!user.captainTeam) {
                  user.captainTeam = {
                    gold: {},
                    platinum: {}
                  };
                }
                if (
                  !user.captainTeam[
                    this.props.team.league === 1 ? "gold" : "platinum"
                  ]
                ) {
                  user.captainTeam[
                    this.props.team.league === 1 ? "gold" : "platinum"
                  ] = {};
                }
                user.captainTeam[
                  this.props.team.league === 1 ? "gold" : "platinum"
                ][this.props.team._id] = this.props.player.id;
                let team = this.props.team;
                team.captain = this.props.player.id;
                const res = await this.props.update({
                  player: user,
                  team
                });
                resolve(res);
              })
            )
          }
        >
          Promote to Captain
        </button>
      </div>
    );
  }
}

class Transfer extends React.Component {
  state = {
    teams: [],
    transferToId: null
  };

  async componentDidMount() {
    let teams = null;
    await this.props.startRequest(
      new Promise(async (resolve, reject) => {
        teams = await Api.getAllTeams();
        resolve();
      }),
      true
    );
    this.setState({ teams: teams.teams });
  }

  setTransferId(transferToId) {
    this.setState({ transferToId, tranferFromId: this.props.team._id });
  }

  render() {
    return (
      <div className={"modal"}>
        <div className={"transfer-team-list"}>
          {this.state.teams
            .map(el =>
              this.props.team._id !== el._id ? (
                <div
                  className={"bar"}
                  onClick={() => this.setTransferId(el._id)}
                  style={
                    this.state.transferToId === el._id
                      ? { backgroundColor: "#1c9ccb" }
                      : {}
                  }
                >
                  <table>
                    <tbody>
                      <tr>
                        <td width={"175px"}>
                          <div className={"img"}>
                            <img
                              alt={""}
                              src={`${config.serverPath}/${config.currentVersion}/img/profileicon/${el.iconId}`}
                            />
                            <div className={"mini-img"}>
                              <img
                                alt={""}
                                src={
                                  el.league === 1
                                    ? require("../../img/ranked-emblems/Emblem_Gold.png")
                                    : require("../../img/ranked-emblems/Emblem_Platinum.png")
                                }
                              />
                            </div>
                          </div>
                        </td>
                        <td>
                          <h3>{el.name}</h3>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : null
            )
            .filter(el => el)}
        </div>
        <button
          onClick={() =>
            this.props.startRequest(
              this.props.movePlayerToTeam({
                fromTeamId: this.state.tranferFromId,
                teamId: this.state.transferToId,
                player: {
                  playerId: this.props.player.id,
                  username: this.props.player.name,
                  position: this.props.player.role
                }
              })
            )
          }
          style={
            !this.state.transferToId
              ? { opacity: 0.35, pointerEvents: "none" }
              : {}
          }
        >
          Transfer Team
        </button>
      </div>
    );
  }
}

class Kick extends React.Component {
  state = {};

  render() {
    return (
      <div className={"modal"}>
        <button
          onClick={() =>
            this.props.startRequest(
              this.props.removePlayerFromTeam({
                teamId: this.props.team._id,
                player: {
                  playerId: this.props.player.id
                }
              })
            )
          }
        >
          Kick from Team
        </button>
      </div>
    );
  }
}

class Add extends React.Component {
  state = {
    selectedUser: null,
    users: []
  };

  async componentDidMount() {
    let users = null;
    await this.props.startRequest(
      new Promise(async (resolve, reject) => {
        users = await Api.getAllUsers();
        resolve();
      }),
      true
    );
    this.setState({ users: users.users });
  }

  setUser(selectedUser) {
    this.setState({ selectedUser });
  }

  render() {
    const league = this.props.team.league === 1 ? "gold" : "platinum";
    return (
      <div className={"modal"}>
        <div className={"transfer-team-list"}>
          {this.state.users
            .map(el => {
              let pass = true;
              ["gold", "platinum"].map(el2 => {
                if (el.memberships && el.memberships[el2]) {
                  if (
                    Object.values(el.memberships[el2]).find(
                      el => el === this.props.team._id
                    ) ||
                    el.leagues[league]
                  ) {
                    pass = false;
                  }
                }
              });
              return pass ? (
                <div
                  className={"bar"}
                  onClick={() => this.setUser(el)}
                  style={
                    this.state.selectedUser &&
                    this.state.selectedUser._id === el._id
                      ? { backgroundColor: "#1c9ccb" }
                      : {}
                  }
                >
                  <table>
                    <tbody>
                      <tr>
                        <td width={"175px"}>
                          <div className={"img"}>
                            <img
                              alt={""}
                              src={`${config.serverPath}/${config.currentVersion}/img/profileicon/${el.iconId}`}
                            />
                          </div>
                        </td>
                        <td>
                          <h3>{el.username}</h3>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : null;
            })
            .filter(el => el)}
        </div>
        <button
          onClick={() =>
            this.props.startRequest(
              this.props.movePlayerToTeam({
                teamId: this.props.team._id,
                player: {
                  playerId: this.state.selectedUser._id,
                  username: this.state.selectedUser.username,
                  position: 1
                }
              })
            )
          }
        >
          Add Player
        </button>
      </div>
    );
  }
}

class PlayerCard extends React.Component {
  render() {
    return (
      <div className={"player-card"}>
        <table>
          <tbody>
            <tr>
              <td width={"5%"}>
                <div className={"position"}>
                  <img
                    onClick={() => this.setIncludes("sub")}
                    src={
                      positionImages[
                        this.props.team.league === 1 ? "gold" : "platinum"
                      ][this.props.data.role].props.src
                    }
                  />
                </div>
              </td>
              <td width={"45%"}>
                <div className={"title"}>
                  <h3>{this.props.data.name}</h3>
                </div>
              </td>
              <td>
                <div className={"control"}>
                  <i
                    className={"fas fa-street-view"}
                    onClick={() =>
                      this.props.openModal(
                        <RoleSelect
                          player={this.props.data}
                          team={this.props.team}
                          update={data => this.props.update(data)}
                        />,
                        {
                          width: "45%",
                          height: "75%"
                        }
                      )
                    }
                  ></i>
                </div>
              </td>
              <td>
                <div className={"control"}>
                  {this.props.data.id !== this.props.team.captain ? (
                    <i
                      className={"fas fa-angle-double-up"}
                      onClick={() =>
                        this.props.openModal(
                          <Captain
                            player={this.props.data}
                            team={this.props.team}
                            update={data => this.props.update(data)}
                          />,
                          {
                            width: "45%",
                            height: "75%"
                          }
                        )
                      }
                    ></i>
                  ) : (
                    <div />
                  )}
                </div>
              </td>
              <td>
                <div className={"control"}>
                  <i
                    className={"fas fa-exchange-alt"}
                    onClick={() =>
                      this.props.openModal(
                        <Transfer
                          player={this.props.data}
                          team={this.props.team}
                          movePlayerToTeam={data =>
                            this.props.movePlayerToTeam(data)
                          }
                        />,
                        {
                          width: "55%",
                          height: "75%"
                        }
                      )
                    }
                  ></i>
                </div>
              </td>
              <td>
                <div className={"control"}>
                  <i
                    className={"fas fa-user-times"}
                    onClick={() =>
                      this.props.openModal(
                        <Kick
                          player={this.props.data}
                          team={this.props.team}
                          removePlayerFromTeam={data =>
                            this.props.removePlayerFromTeam(data)
                          }
                        />,
                        {
                          width: "55%",
                          height: "75%"
                        }
                      )
                    }
                  ></i>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

class TeamCard extends React.Component {
  render() {
    return (
      <div className={"team-card"}>
        <div className={"title"}>
          <div className={"league"}>
            <img
              src={
                this.props.data.league === 1
                  ? require("../../img/ranked-emblems/Emblem_Gold.png")
                  : require("../../img/ranked-emblems/Emblem_Platinum.png")
              }
            />
          </div>
          <h2>{this.props.data.name}</h2>
        </div>
        {this.props.data.members
          ? Object.values(this.props.data.members)
              .sort((a, b) => (a.role < b.role ? -1 : 1))
              .map((el, i) => (
                <PlayerCard
                  key={i}
                  openModal={(modal, size) => this.props.openModal(modal, size)}
                  data={el}
                  team={this.props.data}
                  update={data => this.props.update(data)}
                  movePlayerToTeam={data => this.props.movePlayerToTeam(data)}
                  removePlayerFromTeam={data =>
                    this.props.removePlayerFromTeam(data)
                  }
                />
              ))
          : null}
        <div className={"control"}>
          <i
            className={"fas fa-user-plus"}
            onClick={() =>
              this.props.openModal(
                <Add
                  team={this.props.data}
                  movePlayerToTeam={data => this.props.movePlayerToTeam(data)}
                />,
                {
                  width: "55%",
                  height: "75%"
                }
              )
            }
            style={{ color: "#231f20" }}
          ></i>
        </div>
      </div>
    );
  }
}

class RosterEditor extends React.Component {
  state = {
    modalVisible: false,
    domMounted: false,
    selectedLeagues: {
      gold: false,
      platinum: false
    },
    teams: [],
    html: false,
    modalVisible: false,
    modal: <Components.Login />,
    modalSize: {
      width: "45%",
      height: "75%"
    },
    searchQuery: ""
  };

  async componentDidMount() {
    const user = await Api.validateToken();
    const teams = await Api.getAllTeams();
    this.setState({ domMounted: true, html: user.l < 4, teams: teams.teams });
  }

  openModal(modal, size) {
    this.setState({ modalVisible: false, modal, modalSize: size });
    setTimeout(() => this.setState({ modalVisible: true }), 250);
  }

  setModal(modalVisible) {
    this.setState({ modalVisible });
  }

  pickLeague(league) {
    let selectedLeagues = this.state.selectedLeagues;
    selectedLeagues[league] = !this.state.selectedLeagues[league];
    this.setState({
      selectedLeagues
    });
  }

  async update(data) {
    return new Promise(async (resolve, reject) => {
      await Api.updateUser(data.player._id, data.player);
      const res = await Api.updateTeam(data.team._id, data.team);
      const teams = await Api.getAllTeams();
      this.setState({
        teams: teams.teams
      });
      resolve(res);
    });
  }

  async movePlayerToTeam(data) {
    await Api.movePlayerToTeam(data);
    const teams = await Api.getAllTeams();
    this.setState({
      teams: teams.teams
    });
    return { msg: "Player Transfer Sucessful!" };
  }

  async removePlayerFromTeam(data) {
    await Api.removePlayerFromTeam(data);
    const teams = await Api.getAllTeams();
    this.setState({
      teams: teams.teams
    });
    return { msg: "Player Kicked From Team!" };
  }

  html() {
    const conditionChecker = el => {
      const query =
        this.state.searchQuery.length > 0
          ? el.name.toLowerCase().includes(this.state.searchQuery.toLowerCase())
          : true;
      const league =
        (this.state.selectedLeagues.gold && el.league === 1) ||
        (this.state.selectedLeagues.platinum && el.league === 2);
      return query && league;
    };
    return (
      <div className={"leagues"}>
        <div className={"emblems"}>
          <img
            onClick={() => this.pickLeague("gold")}
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
            onClick={() => this.pickLeague("platinum")}
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
        <div className={"macro"}>
          <input
            onChange={e => this.setState({ searchQuery: e.target.value })}
            placeholder={"Search Query"}
          />
        </div>
        {this.state.teams
          .map((el, i) =>
            conditionChecker(el) ? (
              <TeamCard
                key={i}
                openModal={(modal, size) => this.openModal(modal, size)}
                data={el}
                update={data => this.update(data)}
                movePlayerToTeam={data => this.movePlayerToTeam(data)}
                removePlayerFromTeam={data => this.removePlayerFromTeam(data)}
              />
            ) : null
          )
          .filter(el => el)}
      </div>
    );
  }

  forbidden() {
    return (
      <div>
        <h2>403</h2>
        <h2>Forbidden</h2>
      </div>
    );
  }

  router() {
    return this.state.html ? this.html() : this.forbidden();
  }

  render() {
    return (
      <div className={"roster-editor"}>
        <Components.Loader domMounted={this.state.domMounted}>
          <Components.Modal
            width={this.state.modalSize.width}
            height={this.state.modalSize.height}
            openModal={modal =>
              this.openModal(modal, {
                width: "45%",
                height: "75%"
              })
            }
            setModal={modalVisible => this.setModal(modalVisible)}
            visible={this.state.modalVisible}
          >
            {this.state.modal}
          </Components.Modal>
          <Components.Header
            openModal={() =>
              this.openModal(<Components.Login />, {
                width: "45%",
                height: "75%"
              })
            }
          />
          <div className={"body"}>{this.router()}</div>
          <Components.Footer />
        </Components.Loader>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RosterEditor);
