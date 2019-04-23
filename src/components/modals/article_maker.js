import React, { Component } from "react";
import Modal from "react-awesome-modal";
import { AwesomeButton } from "react-awesome-button";

export default class ArticleMaker extends Component {
  state = {
    content: ["stuffs"]
  };

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
              <div className={"block"}>
                <h3>Image URL</h3>
                <input type="text" />
              </div>
              <div className={"block"}>
                <h3>Title</h3>
                <input type="text" />
              </div>
              {this.state.content.map((el, i) => (
                <div className={"block"}>
                  <textarea name="description" />
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
                <div className="linkButton">Save</div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
