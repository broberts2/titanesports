import React, { Component } from "react";
import Modal from "react-awesome-modal";
import { AwesomeButton } from "react-awesome-button";
import api from "../../api";

export default class ArticleMaker extends Component {
  state = this.props.activeArticle
    ? {
        imgURL: this.props.activeArticle.imgURL,
        title: this.props.activeArticle.title,
        newTitle: this.props.activeArticle.title,
        p: this.props.activeArticle.p,
        content: this.props.activeArticle.content
      }
    : {
        imgURL: "",
        title: "",
        newTitle: "",
        p: "",
        content: [""]
      };

  componentWillReceiveProps(newProps) {
    if (newProps.activeArticle) {
      this.setState(
        Object.assign(
          { newTitle: newProps.activeArticle.title },
          newProps.activeArticle
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
        visible={this.props.visible === this.props.index ? true : false}
        width={"90%"}
        height={"90%"}
        effect={"fadeInUp"}
        onClickAway={() => this.props.closeModal()}
      >
        <div className={"modal-style"}>
          <div className={"article-maker"}>
            <div className={"content"}>
              <div
                className={"back-button"}
                onClick={() =>
                  this.props.lastModal
                    ? this.props.lastModal()
                    : this.props.closeModal()}
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
                {this.props.activeArticle ? (
                  <div
                    className="linkButton"
                    onClick={async () => {
                      const title = this.state.title;
                      this.state.title = this.state.newTitle;
                      console.log(this.state);
                      await api.update_article(title, this.state);
                      this.props.closeModal();
                    }}
                  >
                    Update
                  </div>
                ) : (
                  <div
                    className="linkButton"
                    onClick={async () => {
                      this.state.title = this.state.newTitle;
                      await api.create_article(this.state);
                      this.props.closeModal();
                      this.props.setArticles();
                    }}
                  >
                    Create
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
