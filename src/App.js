import React, { Component } from "react";
import "babel-polyfill";
import Base from "./components/base";
import api from "./utils/api";
import modals from "./components/modals/_modals";
import ranksByNum from "./utils/ranksByNum";
import sorter from "./utils/sorter";
import moment from "moment-timezone";
import "./index.css";

const article_model = {
  imgURL: ``,
  imgCredit: ``,
  title: ``,
  p: ``,
  date: ``,
  metaData: {
    comments: 0,
    likes: 0,
    views: 0
  },
  content: [""]
};

class App extends Component {
  state = {
    loading: false,
    modal: 0,
    lastModal: 0,
    deepModal: 0,
    modals: null,
    userLogged: false,
    articles: [],
    activeArticle: article_model,
    spotlightUser: null,
    users: [],
    teams: [],
    alertHtml: null,
    events: [],
    selectedEvent: null,
    pickingTeam: 1,
    team1: {
      name: "Shurima",
      pick: ["Azir", "Renekton", "Nasus", "Aatrox", null],
      ban: ["Xerath", "Xerath", "Xerath", "Xerath", null],
      iconId: 55,
      index: 1
    },
    team2: {
      name: "Enemies of Shurima",
      pick: ["Kassadin", "Katarina", "Darius", null, null],
      ban: ["Azir", "Azir", "Azir", "Azir", null],
      iconId: 56,
      index: 2
    }
  };

  actions = {
    setMenu: modal =>
      this.setState({
        modal,
        lastModal: this.state.modal,
        deepModal: this.state.lastModal
      }),
    lastModal: modal =>
      this.setState({
        modal: this.state.lastModal,
        lastModal: this.state.modal,
        deepModal: this.state.lastModal
      }),
    setAlert: alertHtml => {
      this.setState({ alertHtml, modal: 2 });
    },
    setPickingTeam: pickingTeam => {
      this.setState({ pickingTeam });
    },
    closeModal: () => this.setState({ modal: 0, lastModal: this.state.modal }),
    showUser: userLogged => this.setState({ userLogged }),
    setArticles: async () => {
      let articles = await api.get_articles();
      articles = articles.reverse();
      articles = articles.sort((a, b) => b.sticky - a.sticky);
      this.setState({ articles });
    },
    setUsers: criteria => this.users(criteria),
    setEvent: event => {
      this.state.selectedEvent = event;
      this.actions.setMenu(4);
    },
    setUsersByTeam: members => this.usersByTeam(members),
    setTeams: criteria => this.teams(criteria),
    sorter: criteria => {
      const users = sorter(criteria, this.state.users);
      this.setState({ users });
    },
    spotlightUser: async spotlightUser => {
      spotlightUser = spotlightUser
        ? await api.get_user(spotlightUser)
        : await api.get_self();
      this.setState({ spotlightUser });
    },
    setArticle: i =>
      this.setState({
        activeArticle: i < 0 ? article_model : this.state.articles[i]
      }),
    setEvents: async () => {
      this.state.loading = true;
      this.actions.setMenu(9);
      let events = await api.get_events();
      events = events.map(el => {
        el.start = new moment(el.start).tz("America/Chicago").toDate();
        el.end = new moment(el.end).tz("America/Chicago").toDate();
        return el;
      });
      this.setState({ loading: false, events });
    },
    editModal: () => {
      this.setMenu(18);
    }
  };

  async users(criteria) {
    this.setState({ loading: true });
    let users = await api.get_users();
    users = sorter(criteria, users);
    this.setState({ users, loading: false });
  }

  async teams(criteria) {
    this.setState({ loading: true });
    let teams = await api.get_teams();
    //users = sortUsers(criteria || "username", users);
    this.setState({ teams, loading: false });
  }

  async usersByTeam(members) {
    this.setState({ loading: true });
    let users = await Promise.all(
      members.map(async el => await api.get_user(el))
    );
    this.setState({ users, loading: false });
  }

  async componentDidMount() {
    api.get_cookie("titan_key")
      ? this.setState({ userLogged: true })
      : this.setState({ userLogged: false });
    await this.actions.setArticles();
  }

  render() {
    return (
      <div>
        {modals(this.state, this.actions)}
        <Base state={this.state} actions={this.actions} />
      </div>
    );
  }
}

export default App;
