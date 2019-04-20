import React, { Component } from "react";
import Modal from "react-awesome-modal";
import { AwesomeButton } from "react-awesome-button";

export default class Article extends Component {
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
              <img src={this.props.activeArticle.imgURL} />
              <h1>{this.props.activeArticle.title}</h1>
              <h4>
                Posted by: <i>{this.props.activeArticle.p}</i>
              </h4>
              <h5>April 19th, 2019</h5>
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
