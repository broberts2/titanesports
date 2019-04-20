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
      <tr onClick={() => this.props.action(this.props.members)}>
        <td align="center">
          <div style={{ width: "350px", textAlign: "left" }}>
            <img
              src={`${config.dataDragon}/${config.currentVersion}/img/profileicon/${this
                .props.iconId}.png`}
            />
            {this.props.name}
          </div>
        </td>
        <td />
        <td />
        <td align="center">{this.props.members.length}</td>
        <td align="center">{this.props.pr}</td>
      </tr>
    );
  }
}

export default class Teams2 extends Component {
  state = {
    loading: true,
    users: null,
    teams: null
  };

  sortBy(key, arr) {
    switch (key) {
      case "name":
        return arr.sort((a, b) => (a[key] < b[key] ? -1 : 1));
      case "members":
        return arr.sort((a, b) => (a[key].length < b[key].length ? -1 : 1));
      case "pr":
        return arr.sort((a, b) => (a[key] < b[key] ? 1 : -1));
    }
  }

  async componentDidMount() {
    let teams = await api.get_teams();
    teams = teams.map(el => {
      el.pr = parseFloat(el.pr);
      return el;
    });
    teams = this.sortBy("name", teams);
    this.setState({ loading: false, teams });
  }

  renderContent() {
    return (
      <div style={{ height: "150%" }}>
        <div className={"bar"}>
          <input type="text" placeholder="Team Name (currently inactive)" />
        </div>
        <table>
          <tr>
            <th
              onClick={() =>
                this.setState({
                  users: this.sortBy("username", this.state.users)
                })}
            >
              Team Name
            </th>
            <th />
            <th />
            <th
              onClick={() =>
                this.setState({
                  users: this.sortBy("position", this.state.users)
                })}
            >
              Members
            </th>
            <th
              onClick={() =>
                this.setState({
                  users: this.sortBy("soloLp", this.state.users)
                })}
            >
              Power Ranking
            </th>
          </tr>
        </table>
        <div className={"content"}>
          <table>
            <tbody>
              {this.state.teams.map(el => (
                <CustomRow
                  name={el.name}
                  iconId={el.iconId}
                  members={el.members}
                  subs={el.subs}
                  pr={el.pr}
                  action={() => this.props.action(el.members)}
                />
              ))}
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
            {this.state.loading ? <Loader /> : this.renderContent()}
            <div className={"button"}>
              <div
                className="linkButton"
                onClick={() => this.props.closeModal()}
              >
                close
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
