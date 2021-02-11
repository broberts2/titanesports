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

const Finished = styled.div`
  position: absolute;
  color: white;
  bottom: -12vw;
  right: 25px;
  font-size: 5vh;
  transition: all 0.5 ease;
  opacity: ${(props) => props.textOpacity};
  z-index: 1000;
`;

export default class _ extends React.Component {
  state = {
    modalButtonTriggered: false,
  };

  pickBan(pick, team, n) {
    const arr = [];
    const fetchSrc = (champion) => {
      for (
        let i = 0;
        i < this.props.STATE.draftData.CHAMPION_DATA.length;
        i++
      ) {
        if (this.props.STATE.draftData.CHAMPION_DATA[i].name === champion) {
          return (
            this.props.STATE.ENDPOINT +
            "/dragontail/" +
            (pick === "pick"
              ? this.props.STATE.draftData.CHAMPION_DATA[i].loadingImg
              : this.props.STATE.draftData.CHAMPION_DATA[i].tileImg)
          );
        }
      }
      return "";
    };
    for (let i = 0; i < n; i++) {
      arr.push(
        <td>
          {pick === "pick" ? (
            <Card
              name={
                this.props.STATE.draftData[`TEAM_${team}`].PICK &&
                this.props.STATE.draftData[`TEAM_${team}`].PICK[i]
                  ? this.props.STATE.draftData[`TEAM_${team}`].PICK[i]
                  : ""
              }
              play={
                this.props.STATE.draftData[`TEAM_${team}`].PICK &&
                this.props.STATE.draftData[`TEAM_${team}`].PICK[i]
                  ? true
                  : false
              }
              source={fetchSrc(
                this.props.STATE.draftData[`TEAM_${team}`].PICK &&
                  this.props.STATE.draftData[`TEAM_${team}`].PICK[i]
                  ? this.props.STATE.draftData[`TEAM_${team}`].PICK[i]
                  : ""
              )}
              cardBack={
                this.props.STATE.ENDPOINT +
                "/" +
                this.props.STATE.draftData[`TEAM_${team}`].CARD_BACK
              }
              border={
                this.props.STATE.ENDPOINT +
                "/" +
                this.props.STATE.draftData[`TEAM_${team}`].CARD_BORDER
              }
              loadAnims={{
                anims: [team < 2 ? "fadeInLeft" : "fadeInRight", "flip"],
                delay:
                  this.props.STATE.draftData[`TEAM_${team}`].CARD_DELAY +
                  1 +
                  (team < 2 ? i / 4 : (n - i - 1) / 4),
              }}
            />
          ) : (
            <Ban
              name={
                this.props.STATE.draftData[`TEAM_${team}`].BAN &&
                this.props.STATE.draftData[`TEAM_${team}`].BAN[i]
                  ? this.props.STATE.draftData[`TEAM_${team}`].BAN[i]
                  : ""
              }
              play={
                this.props.STATE.draftData[`TEAM_${team}`].BAN &&
                this.props.STATE.draftData[`TEAM_${team}`].BAN[i]
                  ? true
                  : false
              }
              source={fetchSrc(
                this.props.STATE.draftData[`TEAM_${team}`].BAN &&
                  this.props.STATE.draftData[`TEAM_${team}`].BAN[i]
                  ? this.props.STATE.draftData[`TEAM_${team}`].BAN[i]
                  : ""
              )}
              border={
                this.props.STATE.ENDPOINT +
                "/" +
                this.props.STATE.draftData[`TEAM_${team}`].BAN_BORDER
              }
              banLock={
                this.props.STATE.ENDPOINT +
                "/" +
                this.props.STATE.draftData[`TEAM_${team}`].BAN_BORDER_LOCK
              }
              loadAnims={{
                anim: team < 2 ? "fadeInLeft" : "fadeInRight",
                delay:
                  this.props.STATE.draftData[`TEAM_${team}`].BAN_DELAY +
                  2 +
                  (team < 2 ? i / 4 : (n - i - 1) / 4),
              }}
            />
          )}
        </td>
      );
    }
    return arr;
  }

  render() {
    if (
      !this.state.modalButtonTriggered &&
      this.props.STATE.draftData.TEAM_ACTIVE > 0
    )
      this.setState({ modalButtonTriggered: true });
    return (
      <_Grid>
        <table width={"100%"}>
          <tbody>
            <tr>
              {this.pickBan("pick", 1, 5)}
              <td width={"5%"} />
              {this.pickBan("pick", 2, 5)}
            </tr>
          </tbody>
        </table>
        <table width={"100%"}>
          <tbody>
            <tr>
              {this.pickBan("ban", 1, 5)}
              <td width={"15%"} align={"center"}>
                <div
                  style={{
                    opacity:
                      this.state.modalButtonTriggered ||
                      this.props.STATE.draftData.EVENTS_LOG.length >= 20
                        ? 1
                        : 0,
                  }}
                >
                  <Transition trans={{ animation: "pulse", count: "infinite" }}>
                    <Button
                      trans={{
                        animation:
                          this.props.STATE.draftData.TEAM_ACTIVE > 0 ||
                          this.props.STATE.draftData.EVENTS_LOG.length >= 20
                            ? "fadeIn"
                            : "fadeOut",
                      }}
                      theme={this.props.STATE.draftData.THEME}
                      pop
                      onClick={() =>
                        this.props.STATE.draftData.TEAM_ACTIVE > 0 ||
                        this.props.STATE.draftData.EVENTS_LOG.length >= 20
                          ? this.props.STATE.setModalStatus(true)
                          : null
                      }
                    >
                      {this.props.STATE.draftData.EVENTS_LOG.length >= 20
                        ? "Replay Options"
                        : "Champion Select"}
                    </Button>
                  </Transition>
                </div>
              </td>
              {this.pickBan("ban", 2, 5)}
            </tr>
          </tbody>
        </table>
        <Finished
          textOpacity={
            this.props.STATE.draftData.EVENTS_LOG.length >= 20 ? 1 : 0
          }
        >
          Draft Finished
        </Finished>
      </_Grid>
    );
  }
}
