import React from "react";
import { connect } from "react-redux";
import Components from "../../components";
import "./article.css";
import IconIndex from "./icon_index";

import Api from "../../Api";

const config = require("../../config");

class Confirm extends React.Component {
  lintJS(article) {
    return article;
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1 style={{ color: "black" }}>Submit Changes?</h1>
        <button
          onClick={async () => {
            (await this.props.isNew)
              ? this.props.startRequest(
                  Api.createArticle(this.lintJS(this.props.article))
                )
              : Object.entries(this.props.article.content).length > 0 &&
                this.props.article.content.constructor === Object
              ? this.props.startRequest(
                  Api.updateArticle(this.lintJS(this.props.article))
                )
              : this.props.startRequest(
                  Api.removeArticle(this.lintJS(this.props.article))
                );
            this.props.cb();
          }}
        >
          Confirm
        </button>
      </div>
    );
  }
}

class Approve extends React.Component {
  lintJS(article) {
    return article;
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1 style={{ color: "black" }}>
          {this.props.status > 0 ? "Unapprove Article?" : "Approve Article?"}
        </h1>
        <button
          onClick={async () => {
            this.props.startRequest(
              Api.setArticleStatus({
                id: this.props.id,
                status: this.props.status === 0 ? 1 : 0
              })
            );
            this.props.cb();
          }}
        >
          Confirm
        </button>
      </div>
    );
  }
}

class Article extends React.Component {
  state = {
    domMounted: false,
    modalVisible: false,
    modalSize: {
      width: "45%",
      height: "75%"
    },
    canEdit: false,
    isNew: true
  };

  async getArticle(user) {
    if (!user) user = await Api.validateToken();
    let params = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
      params[key] = value;
    });
    if (params.id) {
      let article = await Api.getArticle(params.id);
      article.article.id = article.article._id;
      this.setState({ article: article.article, isNew: false });
    } else {
      this.setState({
        article: {
          title: "",
          img_path: "",
          author: user.username,
          content: {}
        }
      });
    }
  }

  async componentDidMount() {
    const user = await Api.validateToken();
    await this.getArticle(user);
    this.state.canEdit =
      user.l < 2 || user.username === this.state.article.author;
    this.setState({
      boxes: this.populateTextBoxes(this.state.article.content),
      domMounted: true
    });
  }

  openModal(modal, size) {
    this.setState({ modalVisible: false, modal, modalSize: size });
    setTimeout(() => this.setState({ modalVisible: true }), 250);
  }

  setModal(modalVisible) {
    this.setState({ modalVisible });
  }

  populateTextBoxes(content) {
    const arr = content
      ? Object.values(content).map((el, i) => (
          <Components.TextBox
            index={i}
            placeholder={""}
            content={el}
            canEdit={this.state.canEdit}
            fontSize={32}
            fontColor={"black"}
            cancel_cb={() => this.updateArticleState("remove", i)}
          />
        ))
      : null;
    return arr;
  }

  updateArticleState(operation, key) {
    let article = this.state.article;
    if (operation === "add") {
      article.content[key] = "";
    } else if (operation === "remove") {
      delete article.content[key];
    }
    article.content = Object.assign({}, Object.values(article.content));
    this.setState({
      article,
      boxes: this.populateTextBoxes(article.content)
    });
  }

  tagToggle(index) {
    let article = this.state.article;
    if (article.icon) {
      if (article.icon.includes(index)) {
        article.icon = article.icon.filter(el => (el !== index ? el : null));
      } else {
        article.icon.push(index);
      }
    } else {
      article.icon = [index];
    }
    this.setState({ article });
  }

  render() {
    return (
      <div className={"article"}>
        <Components.Loader domMounted={this.state.domMounted}>
          <Components.Header
            openModal={() => this.openModal(<Components.Login />)}
          />
          <Components.Modal
            width={this.state.modalSize.width}
            height={this.state.modalSize.height}
            openModal={modal =>
              this.openModal(modal, {
                width: "45%",
                height: "75%"
              })
            }
            setModal={modalVisible => this.setModal(modalVisible)}
            visible={this.state.modalVisible}
          >
            {this.state.modal}
          </Components.Modal>
          {this.state.article ? (
            <div className={"body"}>
              <div className={"title-img"}>
                <div className={"background"}>
                  <img src={this.state.article.img_path} />
                  <div className={"bottom"} />
                  {this.state.canEdit ? (
                    <div className={"title"}>
                      <input
                        placeholder={"Document Title"}
                        value={this.state.article.title}
                        onChange={e => {
                          let article = this.state.article;
                          article.title = e.target.value;
                          this.setState({ article });
                        }}
                      />
                      <div className={"ref"}>
                        <input
                          placeholder={"Article Graphic URL"}
                          value={this.state.article.img_path}
                          onChange={e => {
                            let article = this.state.article;
                            article.img_path = e.target.value;
                            this.setState({ article });
                          }}
                        />
                      </div>
                      <div className={"tags"}>
                        <table>
                          <tbody>
                            <tr>
                              {Object.values(IconIndex).map((el, i) => (
                                <td>
                                  <div
                                    className={`ico ${
                                      this.state.article.icon &&
                                      this.state.article.icon.includes(i)
                                        ? "selected"
                                        : ""
                                    }`}
                                    onClick={() => this.tagToggle(i)}
                                  >
                                    {el}
                                  </div>
                                </td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <h1>{this.state.article.title}</h1>
                  )}
                </div>
              </div>
              <div className={"buffer"}></div>
              <div className={"content"}>
                <div ref={"content"}>{this.state.boxes}</div>
                {this.state.canEdit ? (
                  <div className={"add"}>
                    <i
                      onClick={() =>
                        this.updateArticleState(
                          "add",
                          Object.values(this.state.article.content).length
                        )
                      }
                      className={"far fa-plus-square"}
                    />
                  </div>
                ) : null}
                <div className={"footer"}>
                  <h2>Jetgorilla</h2>
                </div>
                {this.state.canEdit ? (
                  <div>
                    <div>
                      <button
                        onClick={() => {
                          let article = this.state.article;
                          let content = {};
                          Object.values(this.refs["content"].children).map(
                            (el, i) => {
                              content[i] = el.innerText;
                            }
                          );
                          article.content = content;
                          this.setState({ article });
                          this.openModal(
                            <Confirm
                              article={article}
                              isNew={this.state.isNew}
                              cb={() => this.getArticle()}
                            />,
                            this.state.modalSize
                          );
                        }}
                      >
                        {this.state.isNew
                          ? "Create Article"
                          : Object.entries(this.state.article.content).length >
                              0 &&
                            this.state.article.content.constructor === Object
                          ? "Update Article"
                          : "Delete Article"}
                      </button>
                    </div>
                    <div>
                      <button
                        className={
                          this.state.article.status > 0
                            ? "unapprove_bttn"
                            : "approve_bttn"
                        }
                        onClick={() =>
                          this.openModal(
                            <Approve
                              id={this.state.article._id}
                              status={this.state.article.status}
                              cb={() => this.getArticle()}
                            />,
                            this.state.modalSize
                          )
                        }
                      >
                        {this.state.article.status > 0
                          ? "Unapprove Article?"
                          : "Approve Article"}
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            <div className={"four_zero_four"}>
              <h1>404</h1>
            </div>
          )}
          <Components.Footer />
        </Components.Loader>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Article);
