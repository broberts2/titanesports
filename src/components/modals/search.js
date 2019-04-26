import React, { Component } from "react";
import Modal from "react-awesome-modal";
import { AwesomeButton } from "react-awesome-button";
import Loader from "./loader";
import config from "../../config";
import api from "../../utils/api";
import { position } from "../../img/img_router";
import ranksByNum from "../../utils/ranksByNum";

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
    username: false,
    position: false,
    tier: false,
    lp: false,
    membership: false
  };

  renderContent() {
    return (
      <div style={{ height: "150%" }}>
        <div className={"bar"}>
          <input
            style={{ width: "40%" }}
            type="text"
            placeholder="Summoner Name"
          />
        </div>
        <table>
          <tr>
            <th
              className={this.state.username ? "selected" : null}
              onClick={() => {
                const state = {
                  username: !this.state.username,
                  position: false,
                  tier: false,
                  lp: false,
                  membership: false
                };
                this.setState(state);
                this.props.actions.organizeUsers("username");
              }}
            >
              Summoner
            </th>
            <th
              className={this.state.position ? "selected" : null}
              onClick={() => {
                const state = {
                  username: false,
                  position: !this.state.position,
                  tier: false,
                  lp: false,
                  membership: false
                };
                this.setState(state);
                this.props.actions.organizeUsers("position");
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
                  tier: !this.state.tier,
                  lp: false,
                  membership: false
                };
                this.setState(state);
                this.props.actions.organizeUsers("tier");
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
                  lp: !this.state.lp,
                  membership: false
                };
                this.setState(state);
                this.props.actions.organizeUsers("soloLp");
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
                  membership: !this.state.membership
                };
                this.setState(state);
                this.props.actions.organizeUsers("membership");
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
