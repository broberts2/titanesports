import React, { Component } from "react";
import Modal from "react-awesome-modal";
import { AwesomeButton } from "react-awesome-button";
import Loader from "./loader";
import config from "../../config";
import api from "../../api";
import { position } from "../../img/img_router";

class CustomRow extends Component {
  render() {
    return (
      <tr onClick={() => this.props.action()}>
        <td align="center">
          <div style={{ width: "150px", textAlign: "left" }}>
            <img
              src={`${config.dataDragon}/${config.currentVersion}/img/profileicon/${this
                .props.iconId}.png`}
            />
            {this.props.username}
          </div>
        </td>
        <td align="center">
          <img src={position(this.props.tier, this.props.role)} />
        </td>
        <td align="center">
          {this.props.tier} {this.props.division}
        </td>
        <td align="center">{this.props.lp}</td>
        <td align="center">{this.props.membership}</td>
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
      case "soloLp":
        return arr.sort((a, b) => (a[key] < b[key] ? 1 : -1));
    }
  }

  async componentDidMount() {
    let users = await api.get_users();
    users = this.sortBy("username", users);
    this.setState({ loading: false, users });
  }

  renderContent() {
    return (
      <div style={{ height: "150%" }}>
        <div className={"bar"}>
          <input type="text" placeholder="Summoner Name (currently inactive)" />
        </div>
        <table>
          <tr>
            <th>Summoner</th>
            <th>Position</th>
            <th>Tier</th>
            <th>LP</th>
            <th>Team Membership</th>
          </tr>
        </table>
        <div className={"content"}>
          <table>
            <tbody>
              {this.state.users.map(el => (
                <CustomRow
                  username={el.username}
                  role={el.soloRole}
                  iconId={el.iconId}
                  tier={el.soloTier}
                  division={el.soloDivision}
                  lp={el.soloLp}
                  membership={el.memberships[0]}
                  action={() => this.props.action(el.username)}
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
