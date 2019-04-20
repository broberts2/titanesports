import React, { Component } from "react";
import Modal from "react-awesome-modal";
import Loader from "./loader";
import api from "../../api";
import config from "../../config";
import { position } from "../../img/img_router";

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
              <td align={"center"} width="25%">
                <div>
                  <h3>Preferred Role</h3>
                </div>
                <div>
                  <h4>
                    <img style={{ width: "40px" }} src={this.props.fthv} />
                  </h4>
                </div>
              </td>
              <td width="45%">
                <div className={"preferred-champions"}>
                  <div>
                    <h3>Preferred Champions</h3>
                  </div>
                  {this.props.mostPlayed
                    ? this.props.mostPlayed.map(el => (
                        <img
                          src={`${config.dataDragon}/${config.currentVersion}/img/champion/${el}.png`}
                        />
                      ))
                    : null}
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
  state = {
    loading: true
  };

  componentWillReceiveProps(newProps) {
    this.getData(newProps.searchTerm);
  }

  async getData(searchTerm) {
    const user = await (this.props.self
      ? api.get_self()
      : api.get_user(searchTerm || this.props.searchTerm));
    this.setState({
      loading: false,
      username: user.username,
      iconId: user.iconId,
      soloTier: user.soloTier,
      soloDivision: user.soloDivision,
      soloLp: user.soloLp,
      soloRole: user.soloRole,
      memberships: user.memberships,
      soloMostPlayed: user.soloMostPlayed,
      titanRole: user.titanRole
    });
  }

  componentDidMount() {
    this.getData();
  }

  renderBackground() {
    switch (this.state.soloTier) {
      case "IRON":
        return require("../../img/Emblem_Iron.png");
      case "BRONZE":
        return require("../../img/Emblem_Bronze.png");
      case "SILVER":
        return require("../../img/Emblem_Silver.png");
      case "GOLD":
        return require("../../img/Emblem_Gold.png");
      case "PLATINUM":
        return require("../../img/Emblem_Platinum.png");
      case "DIAMOND":
        return require("../../img/Emblem_Diamond.png");
      case "MASTER":
        return require("../../img/Emblem_Master.png");
      case "GRANDMASTER":
        return require("../../img/Emblem_Grandmaster.png");
      case "CHALLENGER":
        return require("../../img/Emblem_Challenger.png");
      default:
        return null;
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
            {this.props.self ? (
              <div
                className={"settings"}
                onClick={() => this.props.cogAction()}
              >
                <i className="fas fa-cog fa-3x" />
              </div>
            ) : null}
            <div
              className={"back-button"}
              onClick={() =>
                this.props.lastModal
                  ? this.props.lastModal()
                  : this.props.closeModal()}
            >
              <i className="fas fa-arrow-alt-circle-left fa-3x" />
            </div>
            <div className={"icon-image"}>
              <img
                src={`${config.dataDragon}/${config.currentVersion}/img/profileicon/${this
                  .state.iconId}.png`}
              />
              <div className={"icon-position"}>
                <img
                  src={position(this.state.soloTier, this.state.titanRole)}
                />
              </div>
            </div>
            <div className={"banner-name"}>
              <h1>
                <i>{`${this.state.username}`}</i>
              </h1>
              <h2>
                {this.state.memberships ? `${this.state.memberships[0]}` : ""}
              </h2>
            </div>
          </div>
          <div className={"content"}>
            <Queues
              th={"Ranked Solo/Duo"}
              fv={"Rank"}
              sv={`${this.state.soloTier} ${this.state.soloDivision}`}
              tv={"LP"}
              frv={`${this.state.soloLp}`}
              fthv={position(this.state.soloTier, this.state.soloRole)}
              mostPlayed={this.state.soloMostPlayed}
            />
          </div>
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
          {this.state.loading ? <Loader /> : this.renderContent()}
        </div>
      </Modal>
    );
  }
}

export default UserProfile;
