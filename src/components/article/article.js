import React from "react";
import { connect } from "react-redux";
import Components from "../../components";
import "./article.css";

import Api from "../../Api";

const config = require("../../config");

class Confirm extends React.Component {
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <h1 style={{ color: "black" }}>Submit Changes?</h1>
        <button
          onClick={() =>
            this.props.isNew
              ? this.props.startRequest(Api.createArticle(this.props.article))
              : this.props.startRequest(Api.updateArticle(this.props.article))
          }
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
    this.setState({
      domMounted: true,
      canEdit: user.l < 2 || user.username === this.state.article.author
    });
  }

  openModal(modal, size) {
    this.setState({ modalVisible: false, modal, modalSize: size });
    setTimeout(() => this.setState({ modalVisible: true }), 250);
  }

  setModal(modalVisible) {
    this.setState({ modalVisible });
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
                    </div>
                  ) : (
                    <h1>{this.state.article.title}</h1>
                  )}
                </div>
              </div>
              <div className={"buffer"}></div>
              <div className={"content"}>
                <div ref={"content"}>
                  {Object.values(this.state.article.content).map((el, i) => (
                    <Components.TextBox
                      placeholder={""}
                      content={el}
                      canEdit={this.state.canEdit}
                      fontSize={32}
                      fontColor={"black"}
                      cancel_cb={() => {
                        let article = this.state.article;
                        article.content = Object.assign(
                          {},
                          Object.values(this.state.article.content).filter(
                            (el2, i2) => (i !== i2 ? el2 : null)
                          )
                        );
                        this.setState({ article });
                      }}
                    />
                  ))}
                </div>
                {this.state.canEdit ? (
                  <div className={"add"}>
                    <i
                      onClick={() => {
                        let article = this.state.article;
                        article.content[
                          Object.values(this.state.article.content).length
                        ] = "";
                        this.setState({ article });
                      }}
                      className={"far fa-plus-square"}
                    />
                  </div>
                ) : null}
                <div className={"footer"}>
                  <h2>Jetgorilla</h2>
                </div>
                {this.state.canEdit ? (
                  <button
                    onClick={() => {
                      let article = this.state.article;
                      let content = {};
                      Object.values(this.refs["content"].children).map(
                        (el, i) => {
                          content[i] = el.textContent;
                        }
                      );
                      article.content = content;
                      this.setState({ article });
                      this.openModal(
                        <Confirm article={article} isNew={this.state.isNew} />,
                        this.state.modalSize
                      );
                    }}
                  >
                    {this.state.isNew ? "Create Article" : "Update Article"}
                  </button>
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
