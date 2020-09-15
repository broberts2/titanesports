import React from "react";
import styled from "styled-components";
import { Grid, Button, Transition } from "arclight-react";
import Card from "../Card/Card";
import Ban from "../Ban/Ban";

const _Grid = styled.div`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -60%);
  z-index: 3;
  width: calc(100% - 50px);
`;

export default class _ extends React.Component {
  state = {
    modalButtonTriggered: false,
  };

  render() {
    if (!this.state.modalButtonTriggered && this.props.STATE.team_active > 0)
      this.setState({ modalButtonTriggered: true });
    return (
      <_Grid>
        <table width={"100%"}>
          <tbody>
            <tr>
              <td>
                <Card
                  cardBack={this.props.STATE.config.TEAM_1.CARD_BACK}
                  border={this.props.STATE.config.TEAM_1.CARD_BORDER}
                  loadAnims={{
                    anims: ["fadeInLeft", "flip"],
                    delay: this.props.STATE.config.TEAM_1.CARD_DELAY + 1,
                  }}
                />
              </td>
              <td>
                <Card
                  cardBack={this.props.STATE.config.TEAM_1.CARD_BACK}
                  border={this.props.STATE.config.TEAM_1.CARD_BORDER}
                  loadAnims={{
                    anims: ["fadeInLeft", "flip"],
                    delay: this.props.STATE.config.TEAM_1.CARD_DELAY + 1.25,
                  }}
                />
              </td>
              <td>
                <Card
                  cardBack={this.props.STATE.config.TEAM_1.CARD_BACK}
                  border={this.props.STATE.config.TEAM_1.CARD_BORDER}
                  loadAnims={{
                    anims: ["fadeInLeft", "flip"],
                    delay: this.props.STATE.config.TEAM_1.CARD_DELAY + 1.5,
                  }}
                />
              </td>
              <td>
                <Card
                  cardBack={this.props.STATE.config.TEAM_1.CARD_BACK}
                  border={this.props.STATE.config.TEAM_1.CARD_BORDER}
                  loadAnims={{
                    anims: ["fadeInLeft", "flip"],
                    delay: this.props.STATE.config.TEAM_1.CARD_DELAY + 1.75,
                  }}
                />
              </td>
              <td>
                <Card
                  cardBack={this.props.STATE.config.TEAM_1.CARD_BACK}
                  border={this.props.STATE.config.TEAM_1.CARD_BORDER}
                  loadAnims={{
                    anims: ["fadeInLeft", "flip"],
                    delay: this.props.STATE.config.TEAM_1.CARD_DELAY + 2,
                  }}
                />
              </td>
              <td width={"5%"} />
              <td>
                <Card
                  cardBack={this.props.STATE.config.TEAM_2.CARD_BACK}
                  border={this.props.STATE.config.TEAM_2.CARD_BORDER}
                  loadAnims={{
                    anims: ["fadeInRight", "flip"],
                    delay: this.props.STATE.config.TEAM_2.CARD_DELAY + 2,
                  }}
                />
              </td>
              <td>
                <Card
                  cardBack={this.props.STATE.config.TEAM_2.CARD_BACK}
                  border={this.props.STATE.config.TEAM_2.CARD_BORDER}
                  loadAnims={{
                    anims: ["fadeInRight", "flip"],
                    delay: this.props.STATE.config.TEAM_2.CARD_DELAY + 1.75,
                  }}
                />
              </td>
              <td>
                <Card
                  cardBack={this.props.STATE.config.TEAM_2.CARD_BACK}
                  border={this.props.STATE.config.TEAM_2.CARD_BORDER}
                  loadAnims={{
                    anims: ["fadeInRight", "flip"],
                    delay: this.props.STATE.config.TEAM_2.CARD_DELAY + 1.5,
                  }}
                />
              </td>
              <td>
                <Card
                  cardBack={this.props.STATE.config.TEAM_2.CARD_BACK}
                  border={this.props.STATE.config.TEAM_2.CARD_BORDER}
                  loadAnims={{
                    anims: ["fadeInRight", "flip"],
                    delay: this.props.STATE.config.TEAM_2.CARD_DELAY + 1.25,
                  }}
                />
              </td>
              <td>
                <Card
                  cardBack={this.props.STATE.config.TEAM_2.CARD_BACK}
                  border={this.props.STATE.config.TEAM_2.CARD_BORDER}
                  loadAnims={{
                    anims: ["fadeInRight", "flip"],
                    delay: this.props.STATE.config.TEAM_2.CARD_DELAY + 1,
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <table width={"100%"}>
          <tbody>
            <tr>
              <td>
                <Ban
                  border={this.props.STATE.config.TEAM_1.BAN_BORDER}
                  banLock={this.props.STATE.config.TEAM_1.BAN_BORDER_LOCK}
                  loadAnims={{
                    anim: "fadeInLeft",
                    delay: this.props.STATE.config.TEAM_1.BAN_DELAY + 2,
                  }}
                />
              </td>
              <td>
                <Ban
                  border={this.props.STATE.config.TEAM_1.BAN_BORDER}
                  banLock={this.props.STATE.config.TEAM_1.BAN_BORDER_LOCK}
                  loadAnims={{
                    anim: "fadeInLeft",
                    delay: this.props.STATE.config.TEAM_1.BAN_DELAY + 2.25,
                  }}
                />
              </td>
              <td>
                <Ban
                  border={this.props.STATE.config.TEAM_1.BAN_BORDER}
                  banLock={this.props.STATE.config.TEAM_1.BAN_BORDER_LOCK}
                  loadAnims={{
                    anim: "fadeInLeft",
                    delay: this.props.STATE.config.TEAM_1.BAN_DELAY + 2.5,
                  }}
                />
              </td>
              <td>
                <Ban
                  border={this.props.STATE.config.TEAM_1.BAN_BORDER}
                  banLock={this.props.STATE.config.TEAM_1.BAN_BORDER_LOCK}
                  loadAnims={{
                    anim: "fadeInLeft",
                    delay: this.props.STATE.config.TEAM_1.BAN_DELAY + 2.75,
                  }}
                />
              </td>
              <td>
                <Ban
                  border={this.props.STATE.config.TEAM_1.BAN_BORDER}
                  banLock={this.props.STATE.config.TEAM_1.BAN_BORDER_LOCK}
                  loadAnims={{
                    anim: "fadeInLeft",
                    delay: this.props.STATE.config.TEAM_1.BAN_DELAY + 3,
                  }}
                />
              </td>
              <td width={"15%"} align={"center"}>
                <div
                  style={{ opacity: this.state.modalButtonTriggered ? 1 : 0 }}
                >
                  <Transition trans={{ animation: "pulse", count: "infinite" }}>
                    <Button
                      trans={{
                        animation:
                          this.props.STATE.team_active > 0
                            ? "fadeIn"
                            : "fadeOut",
                      }}
                      theme={"Light"}
                      pop
                      onClick={() =>
                        this.props.STATE.team_active > 0
                          ? this.props.STATE.setModalStatus(true)
                          : null
                      }
                    >
                      Champion Select
                    </Button>
                  </Transition>
                </div>
              </td>
              <td>
                <Ban
                  border={this.props.STATE.config.TEAM_2.BAN_BORDER}
                  banLock={this.props.STATE.config.TEAM_2.BAN_BORDER_LOCK}
                  loadAnims={{
                    anim: "fadeInRight",
                    delay: this.props.STATE.config.TEAM_2.BAN_DELAY + 3,
                  }}
                />
              </td>
              <td>
                <Ban
                  border={this.props.STATE.config.TEAM_2.BAN_BORDER}
                  banLock={this.props.STATE.config.TEAM_2.BAN_BORDER_LOCK}
                  loadAnims={{
                    anim: "fadeInRight",
                    delay: this.props.STATE.config.TEAM_2.BAN_DELAY + 2.75,
                  }}
                />
              </td>
              <td>
                <Ban
                  border={this.props.STATE.config.TEAM_2.BAN_BORDER}
                  banLock={this.props.STATE.config.TEAM_2.BAN_BORDER_LOCK}
                  loadAnims={{
                    anim: "fadeInRight",
                    delay: this.props.STATE.config.TEAM_2.BAN_DELAY + 2.5,
                  }}
                />
              </td>
              <td>
                <Ban
                  border={this.props.STATE.config.TEAM_2.BAN_BORDER}
                  banLock={this.props.STATE.config.TEAM_2.BAN_BORDER_LOCK}
                  loadAnims={{
                    anim: "fadeInRight",
                    delay: this.props.STATE.config.TEAM_2.BAN_DELAY + 2.25,
                  }}
                />
              </td>
              <td>
                <Ban
                  border={this.props.STATE.config.TEAM_2.BAN_BORDER}
                  banLock={this.props.STATE.config.TEAM_2.BAN_BORDER_LOCK}
                  loadAnims={{
                    anim: "fadeInRight",
                    delay: this.props.STATE.config.TEAM_2.BAN_DELAY + 2,
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </_Grid>
    );
  }
}
