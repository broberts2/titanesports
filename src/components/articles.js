import React, { Component } from "react";
import Loader from "./modals/loader";
import api from "../utils/api";

class Card extends Component {
  render() {
    return (
      <div className={"articles"} onClick={() => this.props.activate()}>
        <div
          className={
            this.props.approved || this.props.new
              ? this.props.sticky ? "sticky" : null
              : "shadow"
          }
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
                  <h4>Posted by: {this.props.p}</h4>
                  {this.props.approved ? (
                    <h4>Dated Published: {this.props.date}</h4>
                  ) : null}
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
    this.props.articles.map((el, i) => {
      const card = (
        <Card
          approved={el.approved}
          sticky={el.sticky}
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
    if (this.props.userLogged) {
      cards.push(
        <Card activate={() => this.props.setArticle(-1)} new={true} />
      );
    }
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
