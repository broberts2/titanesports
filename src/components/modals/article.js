import React, { Component } from "react";
import Modal from "react-awesome-modal";
import { AwesomeButton } from "react-awesome-button";
import api from "../../utils/api";

export default class Article extends Component {
  state = {
    level: 7
  };

  async componentDidMount() {
    const self = await api.get_self();
    this.setState({ level: self.level });
  }

  renderEditBar() {
    return (
      <div className={"edit-bar"}>
        {this.state.level < 3 ? (
          this.props.state.activeArticle.approved ? (
            <i
              className="fas fa-hand-paper fa-3x"
              onClick={async () => {
                if (window.confirm("Un-publish this article?")) {
                  await api.update_article(
                    this.props.state.activeArticle.title,
                    {
                      approved: false
                    }
                  );
                  await this.props.actions.setArticles();
                  this.props.actions.closeModal();
                }
              }}
            />
          ) : (
            <div>
              <i
                className="fas fa-check-square fa-3x"
                onClick={async () => {
                  if (window.confirm("Publish this article?")) {
                    await api.update_article(
                      this.props.state.activeArticle.title,
                      {
                        approved: true
                      }
                    );
                    await this.props.actions.setArticles();
                    this.props.actions.closeModal();
                  }
                }}
              />
              <i
                className="fas fa-pen-square fa-3x"
                onClick={() => {
                  this.props.actions.setMenu(17);
                }}
              />
              <i
                className="fas fa-window-close fa-3x"
                onClick={async () => {
                  if (window.confirm("Delete this article?")) {
                    await api.delete_article(
                      this.props.state.activeArticle.title
                    );
                    await this.props.actions.setArticles();
                    this.props.actions.closeModal();
                  }
                }}
              />
            </div>
          )
        ) : (
          <i
            className="fas fa-pen-square fa-3x"
            onClick={() => {
              this.props.actions.setMenu(17);
            }}
          />
        )}
      </div>
    );
  }

  render() {
    return (
      <Modal
        visible={this.props.state.modal === this.props.index ? true : false}
        width={"75%"}
        height={"90%"}
        effect={"fadeInUp"}
        onClickAway={() => this.props.actions.closeModal()}
      >
        <div className={"modal-style"}>
          <div className={"article-body"}>
            <div className={"content"}>
              <div className={"poster"}>
                <img src={this.props.state.activeArticle.imgURL} />
                {this.props.state.activeArticle.imgCredit ? (
                  <div className={"signature"}>
                    Image by:{" "}
                    <a
                      href={this.props.state.activeArticle.imgURL}
                      target={"_blank"}
                    >
                      {this.props.state.activeArticle.imgCredit}
                    </a>
                  </div>
                ) : null}
              </div>
              <h1>{this.props.state.activeArticle.title}</h1>
              <h4>
                Posted by: <i>{this.props.state.activeArticle.p}</i>
              </h4>
              <h5>{this.props.state.activeArticle.date}</h5>
              <div className={"spacer"} />
              {this.props.state.activeArticle.content.map(el => (
                <div className={"margin"}>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: el.replace(
                        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
                        ""
                      )
                    }}
                  />
                </div>
              ))}
              {this.props.state.userLogged ? this.renderEditBar() : null}
            </div>
            <div
              className={"close-button"}
              onClick={() => this.props.actions.closeModal()}
            >
              <div className="linkButton">Close</div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
