import React, { Component } from "react";
import Modal from "react-awesome-modal";
import Loader from "./loader";
const config = require("../../config");

const team = (obj, pickingTeam, reverse) => (
  <td>
    <div
      className={`team ${pickingTeam === obj.index
        ? reverse ? "show-team-reverse" : "show-team"
        : reverse ? "leave-team-reverse" : "leave-team"}`}
    >
      <img
        className={`team ${pickingTeam > 0
          ? pickingTeam === obj.index ? "selected" : ""
          : ""}`}
        src={`${config.static_url}/${config.currentVersion}/img/profileicon/${obj.iconId}.png`}
      />
      <h2>{obj.name}</h2>
    </div>
  </td>
);

const pickCard = champion => (
  <div className={"pick"}>
    {champion ? (
      <img
        src={`${config.static_url}/${config.currentVersion}/loading/${champion}_0.jpg`}
      />
    ) : (
      <img src={`${config.static_url}/img/unkown-champion.png`} />
    )}
  </div>
);

const banCard = champion => (
  <div className={"ban"}>
    {champion ? (
      <div>
        <div className={"champion"}>
          <img
            src={`${config.static_url}/${config.currentVersion}/img/champion/${champion}.png`}
          />
        </div>
        <div className={"ban-image"}>
          <img src={`${config.static_url}/img/ban.png`} />
        </div>
      </div>
    ) : (
      <img src={`${config.static_url}/img/unkown-ban.png`} />
    )}
  </div>
);

const pickBanRow = obj => (
  <table style={{ width: "90%" }}>
    <tbody>
      <tr>
        <td>{pickCard(obj.pick[0])}</td>
        <td>{pickCard(obj.pick[1])}</td>
        <td>{pickCard(obj.pick[2])}</td>
        <td>{pickCard(obj.pick[3])}</td>
        <td>{pickCard(obj.pick[4])}</td>
      </tr>
      <tr>
        <td>{banCard(obj.ban[0])}</td>
        <td>{banCard(obj.ban[1])}</td>
        <td>{banCard(obj.ban[2])}</td>
        <td>{banCard(obj.ban[3])}</td>
        <td>{banCard(obj.ban[4])}</td>
      </tr>
    </tbody>
  </table>
);

class ChampionModal extends Component {
  championCard(champion) {
    return () => (
      <div>
        <img
          src={`${config.static_url}/${config.currentVersion}/img/champion/${champion}.png`}
        />
      </div>
    );
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        width={"75%"}
        height={"90%"}
        effect={"fadeInUp"}
        onClickAway={() => this.props.closeModal()}
      >
        <div className={"modal-style"}>
          <div className={"champion-modal"}>
            <input
              style={{ width: "40%" }}
              type="text"
              placeholder="Champion"
            />
            {this.championCard("Aatrox")}
          </div>
        </div>
      </Modal>
    );
  }
}

export default class Prodraft extends Component {
  state = {
    showingChampionModal: false
  };
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
          <div className={"prodraft"}>
            <ChampionModal
              visible={this.state.showingChampionModal}
              closeModal={() => this.setState({ showingChampionModal: false })}
            />
            <div className={"video"}>
              <video key={""} muted={true} preload="auto" loop autoPlay>
                <source
                  src={`${config.static_url}/webm/animated-ionia.webm`}
                  type={"video/webm"}
                />
              </video>
            </div>
            <div className={"header"}>
              <table>
                <tbody>
                  <tr>
                    {team(this.props.state.team1, this.props.state.pickingTeam)}
                    <td>
                      <h1>VS</h1>
                    </td>
                    {team(
                      this.props.state.team2,
                      this.props.state.pickingTeam,
                      true
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={"body"}>
              <table>
                <tbody>
                  <tr>
                    <td>{pickBanRow(this.props.state.team1)}</td>
                    <td>{pickBanRow(this.props.state.team2, true)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              style={{ zIndex: "100", position: "relative" }}
              onClick={() =>
                this.props.actions.setPickingTeam(
                  this.props.state.pickingTeam === 1 ? 2 : 1
                )}
            >
              shalom
            </button>
            <button
              style={{ zIndex: "100", position: "relative" }}
              onClick={() => this.setState({ showingChampionModal: true })}
            >
              Champions
            </button>
          </div>
        </div>
      </Modal>
    );
  }
}
