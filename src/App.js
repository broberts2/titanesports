import React, { Component } from "react";
import Base from "./components/base";
import api from "./api";
import modals from "./components/modals/_modals";
import "./index.css";

const article_model = {
  imgURL: ``,
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
    modal: 0,
    modals: null,
    userLogged: false,
    searchTerm: "",
    batchSearchTerm: [],
    articles: [],
    activeArticle: article_model
  };

  closeModal() {
    this.setState({ modal: 0 });
  }

  setMenu(modal) {
    this.setState({ modal });
  }

  modalActions = {
    setMenu: num => this.setMenu(num),
    showUser: userLogged => this.setState({ userLogged }),
    setSearchTerm: searchTerm => this.setState({ searchTerm }),
    setBatchSearchTerm: batchSearchTerm => this.setState({ batchSearchTerm }),
    setArticles: () => this.getArticles(),
    setArticle: i => this.setState({ activeArticle: this.state.articles[i] }),
    editModal: () => {
      this.setMenu(18);
    }
  };

  async getArticles() {
    let articles = await api.get_articles();
    this.setState({ articles });
  }

  componentDidMount() {
    this.getArticles();
  }

  render() {
    return (
      <div>
        {modals(
          this.state.modal,
          this.state.searchTerm,
          this.state.batchSearchTerm,
          () => this.closeModal(),
          this.state.activeArticle,
          this.state.userLogged,
          this.modalActions
        )}
        <Base state={this.state} actions={this.modalActions} />
      </div>
    );
  }
}

export default App;
