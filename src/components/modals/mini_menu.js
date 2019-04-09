import React, { Component } from "react";
import Modal from "react-awesome-modal";
import { AwesomeButton } from "react-awesome-button";
import MediaLink from "../../media_links";

export default class MenuMini extends Component {
  render() {
    return (
      <Modal
        visible={this.props.visible === 3 ? true : false}
        width={"400"}
        height={"300"}
        effect={"fadeInUp"}
        onClickAway={() => this.props.closeModal()}
      >
        <table width={"100%"}>
          <tbody>
            <tr>
              <td align={"center"}>
                <div className={"button"}>
                  <a href={MediaLink.discord} target={"_blank"}>
                    <AwesomeButton
                      style={{ width: "65px", height: "65px" }}
                      type={"primary"}
                      size={"icon"}
                    >
                      <div className={`fab fa-discord fa-2x`} />
                    </AwesomeButton>
                  </a>
                </div>
              </td>
              <td align={"center"}>
                <div className={"button"}>
                  <a href={MediaLink.twitch} target={"_blank"}>
                    <AwesomeButton
                      style={{ width: "65px", height: "65px" }}
                      type={"primary"}
                      size={"icon"}
                    >
                      <div className={`fab fa-twitch fa-2x`} />
                    </AwesomeButton>
                  </a>
                </div>
              </td>
              <td align={"center"}>
                <div className={"button"}>
                  <a href={MediaLink.youTube} target={"_blank"}>
                    <AwesomeButton
                      style={{ width: "65px", height: "65px" }}
                      type={"primary"}
                      size={"icon"}
                    >
                      <div className={`fab fa-youtube fa-2x`} />
                    </AwesomeButton>
                  </a>
                </div>
              </td>
              <td align={"center"}>
                <div className={"button"} onClick={() => this.props.action()}>
                  <a>
                    <AwesomeButton
                      style={{ width: "65px", height: "65px" }}
                      type={"primary"}
                      size={"icon"}
                    >
                      <div className={`fas fa-file-signature fa-2x`} />
                    </AwesomeButton>
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Modal>
    );
  }
}
