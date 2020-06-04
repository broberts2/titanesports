import React from "react";
import Components from "./components";
import ReactModal from "react-awesome-modal";
import "./intro_modal.css";
const emitters = require("./emitters");
const config = require("../../server/config");
const gameVersion = require("../../game_version");
const server = config.production
  ? "https://titan-esports.org:7001"
  : "http://localhost:7001";

const lobby_video = require("./videos/animated-bilgewater.webm");

const THEME = "bilgewater";

class VS extends React.Component {
  render() {
    return (
      <div className={"vs"}>
        <div className={"body"}>
          <table>
            <tbody>
              <tr>
                <td align={"center"}>
                  <div className={"blue-img"}>
                    <img src={this.props.t1_logo} />
                  </div>
                </td>
                <td align={"center"}>
                  <div className={"vs-img"}>
                    <img src={require("./img/vs_bilgewater.png")} />
                  </div>
                </td>
                <td align={"center"}>
                  <div className={"red-img"}>
                    <img src={this.props.t2_logo} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default class App extends React.Component {
  state = {
    loaded: false,
    team: 0,
    countdown: false,
    showFill: true,
    running: false,
    finished: false,
    error: null,
    glowColor: "blue",
    simple: true,
    active: -1,
    modal: false,
    blue_ready: false,
    red_ready: false,
    blue_captain: false,
    red_captain: false,
    blueTime: -1,
    redTime: -1,
    t1_name: "",
    t1_logo: "",
    t2_name: "",
    t2_logo: "",
    championData: null,
    data: {
      blue: {
        pick: {
          0: null,
          1: null,
          2: null,
          3: null,
          4: null,
        },
        ban: {
          0: null,
          1: null,
          2: null,
          3: null,
          4: null,
        },
      },
      red: {
        pick: {
          0: null,
          1: null,
          2: null,
          3: null,
          4: null,
        },
        ban: { 0: null, 1: null, 2: null, 3: null, 4: null },
      },
    },
  };

  actions = {
    setModal: (modal) => this.setState({ modal }),
    getChampionData: async () => {
      const championData = await fetch(
        `${server}/api/getChampionData`
      ).then((res) => res.json());
      this.setState({ championData });
    },
    submitButton: (index) => {
      emitters.emit_update(index);
    },
    update: emitters.update,
  };

  intervalFunction() {
    if (this.state.blueTime >= 0) {
      this.setState({ blueTime: this.state.blueTime - 1 });
    }
    if (this.state.redTime >= 0) {
      this.setState({ redTime: this.state.redTime - 1 });
    }
  }

  async componentDidMount() {
    const intervalId = setInterval(() => this.intervalFunction(), 1000);
    this.actions.getChampionData();
    this.setState({ intervalId: intervalId });
    this.actions.update((state) => this.setState(state));
    if (
      !(this.state.blue_ready && this.state.red_ready) ||
      this.state.showFill
    ) {
      emitters.playLobbyMusic();
    }
    window.onload = () => {
      this.setState({ loaded: true });
    };
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    const leftImg = <img src={require("./img/left_bilgewater.png")} />;
    const rightImg = <img src={require("./img/right_bilgewater.png")} />;
    return (
      <div
        style={{ position: "relative" }}
        onClick={() =>
          !this.state.modal &&
          !this.state.finished &&
          this.state.running &&
          ((this.state.team === 0 && this.state.blue_captain) ||
            (this.state.team === 1 && this.state.red_captain))
            ? this.actions.setModal(true)
            : null
        }
      >
        {!this.state.error ? (
          <div
            style={{
              opacity:
                this.state.blue_ready && this.state.red_ready ? "1" : "0",
            }}
          >
            <Components.Header
              state={this.state}
              blue_img={this.state.t1_logo}
              red_img={this.state.t2_logo}
              blue_team={this.state.t1_name}
              red_team={this.state.t2_name}
            />
            {this.state.championData ? (
              <Components.Modal
                state={this.state}
                actions={this.actions}
                emitters={emitters}
              />
            ) : null}
            <Components.Window state={this.state} actions={this.actions} />
          </div>
        ) : null}
        {!(this.state.blue_ready && this.state.red_ready) ||
        (this.state.showFill && !this.state.running) ? (
          <div
            style={{
              position: "absolute",
              width: "100vw",
              height: "100vh",
              top: "0",
              left: "0",
              zIndex: "2",
              overflowX: "hidden",
              overflowY: "hidden",
            }}
          >
            <video src={lobby_video} preload loop autoPlay />
            <div className={"intro-modal"}>
              {this.state.blue_ready ? (
                <div className={"blue-ready-header"}>
                  <h1>Ready</h1>
                </div>
              ) : null}
              {this.state.red_ready ? (
                <div className={"red-ready-header"}>
                  <h1>Ready</h1>
                </div>
              ) : null}
              <div className={"body"}>
                {this.state.error ? (
                  <h1 style={{ color: "red" }}>Lobby not found</h1>
                ) : (
                  <VS
                    t1_logo={this.state.t1_logo}
                    t2_logo={this.state.t2_logo}
                  />
                )}
                {(this.state.blue_captain && !this.state.blue_ready) ||
                (this.state.red_captain && !this.state.red_ready) ? (
                  <div style={{ position: "relative", height: "100vh" }}>
                    <div className={"button"}>
                      <button
                        onClick={() =>
                          this.state.blue_captain
                            ? emitters.emit_blue_ready()
                            : emitters.emit_red_ready()
                        }
                        style={{
                          backgroundColor: this.state.blue_captain
                            ? "blue"
                            : "red",
                        }}
                      >
                        {this.state.blue_captain ? "Blue Ready" : "Red Ready"}
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
        {this.state.countdown ? (
          <Components.CountDown
            setCountdown={(countdown) => this.setState({ countdown })}
            setShowFill={(showFill) => this.setState({ showFill })}
            t1_logo={this.state.t1_logo}
            t2_logo={this.state.t2_logo}
            leftImg={leftImg}
            rightImg={rightImg}
          />
        ) : null}
        {this.state.finished ? (
          <div className={`finished finished-fade-in`}>
            <h1>Draft Complete</h1>
          </div>
        ) : null}
        <Components.ReactSlider
          setVolume={(volume) => emitters.setVolume(volume)}
        />
        <Components.AppLoader loaded={this.state.loaded} />
      </div>
    );
  }
}
