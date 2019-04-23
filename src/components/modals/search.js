import React, { Component } from "react";
import Modal from "react-awesome-modal";
import { AwesomeButton } from "react-awesome-button";
import Loader from "./loader";
import config from "../../config";
import api from "../../api";
import { position } from "../../img/img_router";
import ranksByNum from "../../ranksByNum";

class CustomRow extends Component {
  render() {
    return (
      <tr onClick={() => this.props.action()}>
        <td align="left">
          <div style={{ width: "150px", textAlign: "left" }}>
            {this.props.captain && this.props.captain.length > 0 ? (
              <div className={"captain-hat"}>
                <img src={require("../../img/captain_hat.png")} />
              </div>
            ) : null}
            <img
              src={`${config.dataDragon}/${config.currentVersion}/img/profileicon/${this
                .props.iconId}.png`}
            />
            <p
              style={{
                display: "inline-flex",
                marginRight: "-300px"
              }}
            >
              {this.props.username}
            </p>
          </div>
        </td>
        <td align="center">
          <img src={position(this.props.tier, this.props.role)} />
        </td>
        <td align="center">
          <p>{this.props.tier}</p> {this.props.division}
        </td>
        <td align="center">
          <p>{this.props.lp}</p>
        </td>
        <td align="center">
          <p>{this.props.membership}</p>
        </td>
      </tr>
    );
  }
}

export default class Search extends Component {
  state = {
    loading: true,
    users: null
  };

  sortBy(key, arr) {
    switch (key) {
      case "username":
        return arr.sort((a, b) => (a[key] < b[key] ? -1 : 1));
      case "position":
        return arr.sort((a, b) => (a.titanRole < b.titanRole ? -1 : 1));
      case "soloLp":
        return arr.sort((a, b) => (a[key] < b[key] ? 1 : -1));
      case "tier":
        return arr.sort(
          (a, b) =>
            ranksByNum(a.soloTier, a.soloDivision, a.soloLp) <
            ranksByNum(b.soloTier, b.soloDivision, b.soloLp)
              ? 1
              : -1
        );
      case "membership":
        return arr.sort(
          (a, b) => (a.memberships[0] < b.memberships[0] ? 1 : -1)
        );
    }
  }

  async getData() {
    if (this.props.batchSearchTerm) {
      let users = await Promise.all(
        this.props.batchSearchTerm.map(async el => await api.get_user(el))
      );
      users = this.sortBy("username", users);
      this.setState({ loading: false, users });
    } else {
      let users = await api.get_users();
      users = this.sortBy("username", users);
      this.setState({ loading: false, users });
    }
  }

  componentWillReceiveProps() {
    this.getData();
  }

  componentDidMount() {
    this.getData();
  }

  renderContent() {
    return (
      <div style={{ height: "150%" }}>
        <div className={"bar"}>
          <input type="text" placeholder="Summoner Name (currently inactive)" />
        </div>
        <table>
          <tr>
            <th
              onClick={() =>
                this.setState({
                  users: this.sortBy("username", this.state.users)
                })}
            >
              Summoner
            </th>
            <th
              onClick={() =>
                this.setState({
                  users: this.sortBy("position", this.state.users)
                })}
            >
              Position
            </th>
            <th
              onClick={() =>
                this.setState({
                  users: this.sortBy("tier", this.state.users)
                })}
            >
              Tier
            </th>
            <th
              onClick={() =>
                this.setState({
                  users: this.sortBy("soloLp", this.state.users)
                })}
            >
              LP
            </th>
            <th
              onClick={() =>
                this.setState({
                  users: this.sortBy("membership", this.state.users)
                })}
            >
              Team Membership
            </th>
          </tr>
        </table>
        <div className={"content"}>
          <table>
            <tbody>
              {this.state.users.map(el => {
                return (
                  <CustomRow
                    captain={el.captainTeam}
                    username={el.username}
                    role={el.titanRole}
                    iconId={el.iconId}
                    tier={el.soloTier}
                    division={el.soloDivision}
                    lp={el.soloLp}
                    membership={el.memberships[0]}
                    action={() => this.props.action(el.username)}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  render() {
    return (
      <Modal
        visible={this.props.visible === this.props.index ? true : false}
        width={"75%"}
        height={"90%"}
        effect={"fadeInUp"}
        onClickAway={() => this.props.closeModal()}
      >
        <div className={"modal-style"}>
          <div className={"search"}>
            {this.props.batchSearchTerm ? (
              <div
                className={"back-button"}
                onClick={() => this.props.lastModal()}
              >
                <i className="fas fa-arrow-alt-circle-left fa-3x" />
              </div>
            ) : null}
            {this.state.loading ? <Loader /> : this.renderContent()}
            {this.props.batchSearchTerm ? null : (
              <div className={"button"}>
                <div
                  className="linkButton"
                  onClick={() => this.props.closeModal()}
                >
                  close
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    );
  }
}
