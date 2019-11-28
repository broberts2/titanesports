import React from "react";
import Components from "./components";
import ReactModal from "react-awesome-modal";
import "./intro_modal.css";
const emitters = require("./emitters");

const config = require("../../server/config");
const server = config.production
  ? "https://titan-esports.org:7001"
  : "http://localhost:7001";

export default class App extends React.Component {
  state = {
    team: 0,
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
          4: null
        },
        ban: {
          0: null,
          1: null,
          2: null,
          3: null,
          4: null
        }
      },
      red: {
        pick: {
          0: null,
          1: null,
          2: null,
          3: null,
          4: null
        },
        ban: { 0: null, 1: null, 2: null, 3: null, 4: null }
      }
    }
  };

  actions = {
    setModal: modal => this.setState({ modal }),
    getChampionData: async () => {
      const championData = await fetch(`${server}/api/getChampionData`).then(
        res => res.json()
      );
      this.setState({ championData });
    },
    submitButton: index => {
      emitters.emit_update(index);
    },
    update: emitters.update
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
    this.actions.update(state => this.setState(state));
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    return (
      <div
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
        {this.state.blue_ready && this.state.red_ready ? (
          <div>
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
        ) : (
          <div>
            <video
              src={require("./videos/c-o-animated-lunarrevel-2014.mp4")}
              preload
              muted
              loop
              autoPlay
            />
            <ReactModal
              visible={!this.state.blue_ready || !this.state.red_ready}
              width={"50%"}
              height={"50%"}
              effect="fadeInUp"
            >
              <div className={"intro-modal"}>
                <div className={"body"}>
                  {this.state.error ? (
                    <h1 style={{ color: "red" }}>Lobby not found</h1>
                  ) : (
                    <h1>Waiting for Ready Check</h1>
                  )}
                  {(this.state.blue_captain && !this.state.blue_ready) ||
                  (this.state.red_captain && !this.state.red_ready) ? (
                    <button
                      onClick={() =>
                        this.state.blue_captain
                          ? emitters.emit_blue_ready()
                          : emitters.emit_red_ready()
                      }
                      style={{
                        backgroundColor: this.state.blue_captain
                          ? "blue"
                          : "red"
                      }}
                    >
                      {this.state.blue_captain ? "Blue Ready" : "Red Ready"}
                    </button>
                  ) : null}
                </div>
              </div>
            </ReactModal>
          </div>
        )}
      </div>
    );
  }
}
