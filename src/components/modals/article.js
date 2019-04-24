import React, { Component } from "react";
import Modal from "react-awesome-modal";
import { AwesomeButton } from "react-awesome-button";
import api from "../../api";

export default class Article extends Component {
  state = {
    level: 7
  };

  async componentDidMount() {
    const self = await api.get_self();
    this.setState({ level: self.level });
  }

  render() {
    return (
      <Modal
        visible={this.props.visible === this.props.index ? true : false}
        width={"75%"}
        height={"90%"}
        effect={"fadeInUp"}
        onClickAway={() => this.props.closeModal()}
      >
        <div className={"modal-style"}>
          <div className={"article-body"}>
            <div className={"content"}>
              {this.state.level < 4 && this.props.userLogged ? (
                <div className={"edit-bar"}>
                  {this.state.level < 3 ? (
                    this.props.activeArticle.approved ? (
                      <i
                        className="fas fa-hand-paper fa-3x"
                        onClick={async () => {
                          if (window.confirm("Un-publish this article?")) {
                            await api.update_article(
                              this.props.activeArticle.title,
                              {
                                approved: false
                              }
                            );
                            await this.props.setArticles();
                          }
                        }}
                      />
                    ) : (
                      <i
                        className="fas fa-check-square fa-3x"
                        onClick={async () => {
                          if (window.confirm("Publish this article?")) {
                            await api.update_article(
                              this.props.activeArticle.title,
                              {
                                approved: true
                              }
                            );
                            await this.props.setArticles();
                          }
                        }}
                      />
                    )
                  ) : null}
                  <i
                    className="fas fa-pen-square fa-3x"
                    onClick={() => {
                      this.props.editModal();
                    }}
                  />
                  <i
                    className="fas fa-window-close fa-3x"
                    onClick={async () => {
                      if (window.confirm("Delete this article?")) {
                        await api.delete_article(
                          this.props.activeArticle.title
                        );
                        await this.props.setArticles();
                        this.props.closeModal();
                      }
                    }}
                  />
                </div>
              ) : null}
              <div className={"poster"}>
                <img src={this.props.activeArticle.imgURL} />
              </div>
              <h1>{this.props.activeArticle.title}</h1>
              <h4>
                Posted by: <i>{this.props.activeArticle.p}</i>
              </h4>
              <h5>{this.props.activeArticle.date}</h5>
              <div className={"spacer"} />
              {this.props.activeArticle.content.map(el => (
                <div className={"margin"}>
                  <div dangerouslySetInnerHTML={{ __html: el }} />
                </div>
              ))}
            </div>
            <div
              className={"close-button"}
              onClick={() => this.props.closeModal()}
            >
              <div className="linkButton">Close</div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
