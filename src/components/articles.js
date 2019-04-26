import React, { Component } from "react";
import Loader from "./modals/loader";
import api from "../utils/api";

class Card extends Component {
  render() {
    return (
      <div className={"articles"} onClick={() => this.props.activate()}>
        <div
          className={this.props.approved || this.props.new ? null : "shadow"}
        >
          <div className="theCards">
            {this.props.new ? (
              <div className={"newImg"}>
                <img src={require("../img/new.jpg")} alt />
                <div className={"icon"}>
                  <div className="fas fa-plus-square fa-6x" />
                </div>
              </div>
            ) : (
              <div>
                <img src={this.props.imgURL} alt />
                <h3>{this.props.title}</h3>
                <div style={{ textAlign: "left" }}>
                  <p>Posted by: {this.props.p}</p>
                  <p>Dated Posted: {this.props.date}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

class Articles extends Component {
  state = {
    index: 0,
    hover: -1,
    level: 6,
    username: ""
  };

  async componentDidMount() {
    const self = await api.get_self();
    this.setState({
      level: self.level,
      username: self.username
    });
  }

  calcIndex(modifier) {
    return this.state.index >= this.state.articles.length - modifier
      ? 0
      : this.state.index + modifier;
  }

  render() {
    let cards = [];
    if (this.props.userLogged) {
      cards.push(
        <Card activate={() => this.props.setArticle(-1)} new={true} />
      );
    }
    this.props.articles.map((el, i) => {
      const card = (
        <Card
          approved={el.approved}
          activate={() => this.props.setArticle(i)}
          imgURL={el.imgURL}
          title={el.title}
          p={el.p}
          date={el.date}
          metaData={el.metaData}
        />
      );
      if (el.p === this.state.username || this.state.level < 3) {
        cards.push(card);
      } else if (el.approved) {
        cards.push(card);
      }
    });
    return (
      <div className={"article"}>
        <div className={"content"}>
          <div>{cards}</div>
        </div>
      </div>
    );
  }
}

export default Articles;
