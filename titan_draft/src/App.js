import React from "react";
import Components from "./components";
const Ruleset = require("../ruleset");

export default class App extends React.Component {
  state = {
    glowColor: "blue",
    simple: true,
    active: -1,
    modal: false,
    blueTime: 60,
    redTime: 60,
    championData: null,
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
  };

  actions = {
    setModal: modal => this.setState({ modal }),
    getChampionData: async () => {
      const championData = await fetch(
        `http://localhost:7001/api/getChampionData`
      ).then(res => res.json());
      this.setState({ championData });
    },
    submitButton: index => {
      let state = this.state;
      const team = "blue";
      const pick = "pick";
      const num = 0;
      state[team][pick][`${num}`] = Object.values(
        this.state.championData
      ).filter(el => (el.id === index ? el : null))[0];
      this.setState(state);
      this.actions.setModal(false);
    }
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
    const music = await new Audio(require("./audio/music.mp3"));
    const intervalId = setInterval(() => this.intervalFunction(), 1000);
    this.actions.getChampionData();
    this.setState({ intervalId: intervalId, music });
    this.state.music.play();
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    return (
      <div
        onClick={() => (!this.state.modal ? this.actions.setModal(true) : null)}
      >
        <Components.Header
          state={this.state}
          blue_img={"http://localhost:7001/ADMINS-trans.png"}
          red_img={"http://localhost:7001/BAKA-trans.png"}
          blue_team={"Admins"}
          red_team={"Baka Onii-Chan"}
        />
        {this.state.championData ? (
          <Components.Modal state={this.state} actions={this.actions} />
        ) : null}
        <Components.Window state={this.state} actions={this.actions} />
      </div>
    );
  }
}
