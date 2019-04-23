import React, { Component } from "react";
import Loader from "./modals/loader";
import api from "../api";

class Card extends Component {
  render() {
    return (
      <div className={"articles"} onClick={() => this.props.activate()}>
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
                <p>
                  {`Comments: ${this.props.metaData.comments} / Likes: ${this
                    .props.metaData.likes}
                      / Views: ${this.props.metaData.views}`}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

class Articles extends Component {
  state = {
    index: 0,
    hover: -1,
    level: 6
  };

  async componentDidMount() {
    const self = await api.get_self();
    this.setState({ level: self.level });
  }

  calcIndex(modifier) {
    return this.state.index >= this.state.articles.length - modifier
      ? 0
      : this.state.index + modifier;
  }

  render() {
    return (
      <div className={"article"}>
        <div className={"content"}>
          <div>
            {this.state.level < 4 && this.props.userLogged ? (
              <Card activate={() => this.props.setArticle(-1)} new={true} />
            ) : null}
            {this.props.articles.length > 0 ? (
              this.props.articles.map((el, i) => (
                <Card
                  activate={() => this.props.setArticle(i)}
                  imgURL={el.imgURL}
                  title={el.title}
                  p={el.p}
                  date={el.date}
                  metaData={el.metaData}
                />
              ))
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Articles;
