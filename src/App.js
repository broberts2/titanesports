import React, { Component } from "react";
import Base from "./components/base";
import api from "./utils/api";
import modals from "./components/modals/_modals";
import ranksByNum from "./utils/ranksByNum";
import sortUsers from "./utils/sortUsers";
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
    alertHtml: null
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
    closeModal: () => this.setState({ modal: 0, lastModal: this.state.modal }),
    showUser: userLogged => this.setState({ userLogged }),
    setArticles: async () => {
      let articles = await api.get_articles();
      articles = articles.reverse();
      this.setState({ articles });
    },
    setUsers: criteria => this.users(criteria),
    setUsersByTeam: members => this.usersByTeam(members),
    setTeams: criteria => this.teams(criteria),
    organizeUsers: criteria => {
      const users = sortUsers(criteria || { username: true }, this.state.users);
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
    editModal: () => {
      this.setMenu(18);
    }
  };

  async users(criteria) {
    this.setState({ loading: true });
    let users = await api.get_users();
    users = sortUsers(criteria || "username", users);
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
