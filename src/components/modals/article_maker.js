import React, { Component } from "react";
import Modal from "react-awesome-modal";
import { AwesomeButton } from "react-awesome-button";
import api from "../../utils/api";

export default class ArticleMaker extends Component {
  state = this.props.state.activeArticle
    ? {
        imgURL: this.props.state.activeArticle.imgURL,
        imgCredit: this.props.state.activeArticle.imgCredit,
        title: this.props.state.activeArticle.title,
        newTitle: this.props.state.activeArticle.title,
        p: this.props.state.activeArticle.p,
        content: this.props.state.activeArticle.content
      }
    : {
        imgURL: "",
        imgCredit: "",
        title: "",
        newTitle: "",
        p: "",
        content: [""]
      };

  componentWillReceiveProps(newProps) {
    if (newProps.state.activeArticle) {
      this.setState(
        Object.assign(
          { newTitle: newProps.state.activeArticle.title },
          newProps.state.activeArticle
        )
      );
    }
  }

  async componentDidMount() {
    const user = await api.get_self();
    if (!this.props.activeArticle) {
      this.setState({ p: user.username });
    }
  }

  render() {
    return (
      <Modal
        visible={this.props.state.modal === this.props.index ? true : false}
        width={"90%"}
        height={"90%"}
        effect={"fadeInUp"}
        onClickAway={() => this.props.actions.closeModal()}
      >
        <div className={"modal-style"}>
          <div className={"article-maker"}>
            <div className={"content"}>
              <div
                className={"back-button"}
                onClick={() =>
                  this.props.state.lastModal === 17
                    ? this.props.actions.closeModal()
                    : this.props.actions.lastModal()}
              >
                <i className="fas fa-arrow-alt-circle-left fa-3x" />
              </div>
              <div className={"block"}>
                <h3>Image URL</h3>
                <input
                  type="text"
                  value={this.state.imgURL}
                  onChange={e => this.setState({ imgURL: e.target.value })}
                />
              </div>
              <div className={"block"}>
                <h3>Image Credit</h3>
                <input
                  type="text"
                  value={this.state.imgCredit}
                  onChange={e => this.setState({ imgCredit: e.target.value })}
                />
              </div>
              <div className={"block"}>
                <h3>Title</h3>
                <input
                  type="text"
                  value={this.state.newTitle}
                  onChange={e => this.setState({ newTitle: e.target.value })}
                />
              </div>
              {this.state.content.map((el, i) => (
                <div className={"block"}>
                  <textarea
                    name="description"
                    value={this.state.content[i]}
                    onChange={e => {
                      let content = this.state.content;
                      content[i] = e.target.value;
                      this.setState({ content });
                    }}
                  />
                </div>
              ))}
              <div className={"controls"}>
                <i
                  className="far fa-plus-square fa-2x"
                  onClick={() =>
                    this.setState({ content: this.state.content.concat("") })}
                />
                {this.state.content.length > 1 ? (
                  <i
                    class="far fa-minus-square fa-2x"
                    onClick={() =>
                      this.setState({
                        content: this.state.content.slice(0, -1)
                      })}
                  />
                ) : null}
              </div>
              <div className={"save"}>
                {!this.props.state.activeArticle.title ? (
                  <div
                    className="linkButton"
                    onClick={async () => {
                      this.state.title = this.state.newTitle;
                      const user = await api.get_self();
                      this.state.p = user.username;
                      await api.create_article(this.state);
                      this.props.actions.setArticles();
                      this.props.actions.closeModal();
                    }}
                  >
                    Create
                  </div>
                ) : (
                  <div
                    className="linkButton"
                    onClick={async () => {
                      const title = this.state.title;
                      this.state.title = this.state.newTitle;
                      await api.update_article(title, this.state);
                      await this.props.actions.setArticles();
                      this.props.actions.closeModal();
                    }}
                  >
                    Update
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
