import React, { Component } from "react";
import Modal from "react-awesome-modal";
import Loader from "./loader";
import api from "../../utils/api";
import { position } from "../../img_router";
import RadarChart from "../radar_chart";

const config = require("../../config");

class Queues extends Component {
  render() {
    return (
      <div>
        <table style={{ tableLayout: "auto" }}>
          <tbody>
            <th>{this.props.th}</th>
            <tr>
              <td align={"left"} width="10%">
                <div>
                  <h3>{this.props.fv}</h3>
                </div>
                <div>
                  <h4>
                    <i>{this.props.sv}</i>
                  </h4>
                </div>
              </td>
              <td align={"center"} width="20%">
                <div>
                  <h3>{this.props.tv}</h3>
                </div>
                <div>
                  <h4>
                    <i>{this.props.frv}</i>
                  </h4>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

class UserProfile extends Component {
  renderBackground() {
    if (this.props.state.spotlightUser) {
      switch (this.props.state.spotlightUser.soloTier) {
        case "IRON":
          return `${config.static_url}/img/tiers/Emblem_Iron.png`;
        case "BRONZE":
          return `${config.static_url}/img/tiers/Emblem_Bronze.png`;
        case "SILVER":
          return `${config.static_url}/img/tiers/Emblem_Silver.png`;
        case "GOLD":
          return `${config.static_url}/img/tiers/Emblem_Gold.png`;
        case "PLATINUM":
          return `${config.static_url}/img/tiers/Emblem_Platinum.png`;
        case "DIAMOND":
          return `${config.static_url}/img/tiers/Emblem_Diamond.png`;
        case "MASTER":
          return `${config.static_url}/img/tiers/Emblem_Master.png`;
        case "GRANDMASTER":
          return `${config.static_url}/img/tiers/Emblem_Grandmaster.png`;
        case "CHALLENGER":
          return `${config.static_url}/img/tiers/Emblem_Challenger.png`;
        default:
          return null;
      }
    }
  }

  renderContent() {
    return (
      <div style={{ height: "100%" }}>
        <div className={"user-profile-background"}>
          <img src={this.renderBackground()} />
        </div>
        <div className={"user-profile"}>
          <div className={"banner"}>
            {this.props.state.lastModal === 0 ||
            this.props.state.lastModal === 11 ? (
              <div
                className={"settings"}
                onClick={() => this.props.actions.setMenu(11)}
              >
                <i className="fas fa-cog fa-3x" />
              </div>
            ) : null}
            <div
              className={"back-button"}
              onClick={() =>
                this.props.state.lastModal === 11
                  ? this.props.actions.closeModal()
                  : this.props.actions.lastModal()}
            >
              <i className="fas fa-arrow-alt-circle-left fa-3x" />
            </div>
            <div className={"icon-image"}>
              <img
                src={`${config.static_url}/${config.version}/img/profileicon/${this
                  .props.state.spotlightUser.iconId}.png`}
              />
              <div className={"icon-position"}>
                <img
                  src={position(
                    this.props.state.spotlightUser.soloTier,
                    this.props.state.spotlightUser.titanRole
                  )}
                />
              </div>
            </div>
            <div className={"banner-name"}>
              <h1>
                <i>{`${this.props.state.spotlightUser.username}`}</i>
              </h1>
              <h2>
                {this.props.state.spotlightUser.memberships
                  ? `${this.props.state.spotlightUser.memberships[0]}`
                  : ""}
              </h2>
            </div>
          </div>
          <div className={"content"}>
            <Queues
              th={"Ranked Solo/Duo"}
              fv={"Rank"}
              sv={`${this.props.state.spotlightUser.soloTier} ${this.props.state
                .spotlightUser.soloDivision}`}
              tv={"LP"}
              frv={`${this.props.state.spotlightUser.soloLp}`}
              fthv={position(
                this.props.state.spotlightUser.soloTier,
                this.props.state.spotlightUser.soloRole
              )}
              mostPlayed={this.props.state.spotlightUser.soloMostPlayed}
            />
          </div>
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
          {!this.props.state.loading && this.props.state.spotlightUser ? (
            this.renderContent()
          ) : (
            <Loader />
          )}
        </div>
      </Modal>
    );
  }
}

export default UserProfile;
