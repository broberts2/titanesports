import React, { Component } from "react";
import Modal from "react-awesome-modal";
import { AwesomeButton } from "react-awesome-button";
import Loader from "./loader";
import api from "../../utils/api";
import { position } from "../../img_router";
import ranksByNum from "../../utils/ranksByNum";

const config = require("../../config");

class CustomRow extends Component {
  render() {
    return (
      <tr onClick={() => this.props.action()}>
        <td align="left">
          <div style={{ width: "150px", textAlign: "left" }}>
            {this.props.captain && this.props.captain.length > 0 ? (
              <div className={"captain-hat"}>
                <img src={`${config.static_url}/img/captain_hat.png`} />
              </div>
            ) : null}
            <img
              src={`${config.static_url}/${config.version}/img/profileicon/${this
                .props.iconId}.png`}
            />
            <h4
              style={{
                display: "inline-flex",
                marginRight: "-300px"
              }}
            >
              {this.props.username}
            </h4>
          </div>
        </td>
        <td align="center">
          <img src={position(this.props.tier, this.props.role)} />
        </td>
        <td align="center">
          <h4>{this.props.tier}</h4> {this.props.division}
        </td>
        <td align="center">
          <h4>{this.props.lp}</h4>
        </td>
        <td align="center">
          <h4>{this.props.membership}</h4>
        </td>
      </tr>
    );
  }
}

export default class Search extends Component {
  state = {
    username: false,
    position: false,
    tier: false,
    lp: false,
    membership: false,
    searchQuery: ""
  };

  renderContent() {
    return (
      <div style={{ height: "150%" }}>
        <div className={"bar"}>
          <input
            style={{ width: "40%" }}
            type="text"
            placeholder="Summoner Name"
            value={this.state.searchQuery}
            onChange={e => {
              console.log(e.target.value);
              this.state.searchQuery = e.target.value;
              this.props.actions.sorter({ search: e.target.value });
            }}
          />
        </div>
        <table>
          <tr>
            <th
              className={this.state.username ? "selected" : null}
              onClick={() => {
                const state = {
                  username: true,
                  position: false,
                  tier: false,
                  lp: false,
                  membership: false
                };
                this.setState(state);
                this.props.actions.sorter({ query: "username" });
              }}
            >
              Summoner
            </th>
            <th
              className={this.state.position ? "selected" : null}
              onClick={() => {
                const state = {
                  username: false,
                  position: true,
                  tier: false,
                  lp: false,
                  membership: false
                };
                this.setState(state);
                this.props.actions.sorter({ query: "position" });
              }}
            >
              Position
            </th>
            <th
              className={this.state.tier ? "selected" : null}
              onClick={() => {
                const state = {
                  username: false,
                  position: false,
                  tier: true,
                  lp: false,
                  membership: false
                };
                this.setState(state);
                this.props.actions.sorter({ query: "tier" });
              }}
            >
              Tier
            </th>
            <th
              className={this.state.lp ? "selected" : null}
              onClick={() => {
                const state = {
                  username: false,
                  position: false,
                  tier: false,
                  lp: true,
                  membership: false
                };
                this.setState(state);
                this.props.actions.sorter({ query: "soloLp" });
              }}
            >
              LP
            </th>
            <th
              className={this.state.membership ? "selected" : null}
              onClick={() => {
                const state = {
                  username: false,
                  position: false,
                  tier: false,
                  lp: false,
                  membership: true
                };
                this.setState(state);
                this.props.actions.sorter({ query: "membership" });
              }}
            >
              Team Membership
            </th>
          </tr>
        </table>
        <div className={"content"}>
          <table>
            <tbody>
              {this.props.state.users.map(el => {
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
                    action={async () => {
                      await this.props.actions.spotlightUser(el.username);
                      this.props.actions.setMenu(7);
                    }}
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
        visible={this.props.state.modal === this.props.index ? true : false}
        width={"75%"}
        height={"90%"}
        effect={"fadeInUp"}
        onClickAway={() => this.props.actions.closeModal()}
      >
        <div className={"modal-style"}>
          <div className={"search"}>
            <div
              className={"back-button"}
              onClick={() =>
                this.props.state.lastModal === 7
                  ? this.props.actions.closeModal()
                  : this.props.actions.lastModal()}
            >
              <i className="fas fa-arrow-alt-circle-left fa-3x" />
            </div>
            {this.props.state.loading ? <Loader /> : this.renderContent()}
          </div>
        </div>
      </Modal>
    );
  }
}
