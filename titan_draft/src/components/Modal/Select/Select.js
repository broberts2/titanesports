import React from "react";
import styled from "styled-components";
import { Img, Grid, Timer, Button, Transition } from "arclight-react";

const Select = styled.div`
  width: inherit;
  height: inherit;
  position: relative;
  overflow: hidden;
  & .preview {
    width: 100%;
    top: 0;
    left: 0;
    position: absolute;
    pointer-events: none;
  }
`;

const _Title = styled.div`
  color: ${(props) => "#181818"};
  margin-top: 15px;
  & table {
    border-spacing: 20px 0;
  }
`;

const Container = styled.div`
  transition: all 0.5s ease;
  ${(props) => (props.confirming ? "opacity: 0.2;" : null)}
  height: calc(100% - 33.5px);
  ${(props) => (props.confirming ? "pointer-events: none;" : null)}
`;

const Prompt = styled.div`
  ${(props) => (!props.confirming ? "pointer-events: none;" : null)}
  color: #cdcdcd;
  background-color: rgba(0, 0, 0, 0.95);
  border-radius: 4px;
  padding: 15px;
  position: absolute;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -75%);
  .group {
    display: inline-flex;
    & .bttn {
      margin-left: 10px;
      margin-right: 10px;
    }
  }
`;

const FilterWrapper = styled.div`
  & img {
    border: 2px solid ${(props) => "#181818"};
  }
`;

const Item = styled.div`
  position: relative;
  transition: all 0.35s ease;
  width: 100%;
  color: #e0e0e0;
  cursor: pointer;
  ${(props) => (props.suspended ? "pointer-events: none;" : null)}
  ${(props) => (props.suspended ? "opacity: 0.2;" : null)}
  & img {
    width: 100%;
    border-radius: 3px;
    cursor: pointer;
  }
  .sub {
    position: absolute;
    width: 100%;
    height: 75px;
    bottom: 0;
    right: 0;
    background-image: linear-gradient(to top, #000000, rgba(255, 255, 255, 0));
    border-radius: 3px;
    text-align: center;
    .text {
      margin: 3px;
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }
  .roles {
    position: absolute;
    top: 0;
    left: 0;
    text-align: left;
    margin: 2px;
    & img {
      width: 20%;
      border-radius: 50%;
      margin: 0px;
    }
  }
`;

export default class _ extends React.Component {
  state = {
    select: null,
    charactersArray: null,
    confirming: false,
    hoverIndex: -1,
    previewSrc: "",
  };

  componentDidMount() {
    this.fill();
  }

  componentWillReceiveProps(nP) {
    if (
      this.props.STATE.modalVisible !== nP.STATE.modalVisible &&
      nP.STATE.modalVisible
    ) {
      this.fill();
    }
  }

  item(data, delay) {
    return (
      <Transition
        trans={{
          animation: "fadeInLeft",
          delay,
        }}
      >
        <Item
          suspended={data.suspended}
          onClick={() =>
            this.setState({
              confirming: true,
              select: data.champion,
              previewSrc: data.previewSrc,
            })
          }
          onMouseEnter={() => this.setState({ hoverIndex: data.index })}
          onMouseLeave={() => this.setState({ hoverIndex: -1 })}
        >
          <Img src={data.img} />
          <div className={"roles"}>
            {data.roles.includes("fighter") ? (
              <Img
                src={
                  this.props.STATE.ENDPOINT +
                  "/" +
                  this.props.STATE.draftData.MODAL.SEARCH.FIGHTER
                }
              />
            ) : null}
            {data.roles.includes("mage") ? (
              <Img
                src={
                  this.props.STATE.ENDPOINT +
                  "/" +
                  this.props.STATE.draftData.MODAL.SEARCH.MAGE
                }
              />
            ) : null}
            {data.roles.includes("marksman") ? (
              <Img
                src={
                  this.props.STATE.ENDPOINT +
                  "/" +
                  this.props.STATE.draftData.MODAL.SEARCH.MARKSMAN
                }
              />
            ) : null}
            {data.roles.includes("assassin") ? (
              <Img
                src={
                  this.props.STATE.ENDPOINT +
                  "/" +
                  this.props.STATE.draftData.MODAL.SEARCH.ASSASSIN
                }
              />
            ) : null}
            {data.roles.includes("tank") ? (
              <Img
                src={
                  this.props.STATE.ENDPOINT +
                  "/" +
                  this.props.STATE.draftData.MODAL.SEARCH.TANK
                }
              />
            ) : null}
            {data.roles.includes("support") ? (
              <Img
                src={
                  this.props.STATE.ENDPOINT +
                  "/" +
                  this.props.STATE.draftData.MODAL.SEARCH.SUPPORT
                }
              />
            ) : null}
          </div>
          <div className={"sub"}>
            <div className={"text"}>{data.champion}</div>
          </div>
        </Item>
      </Transition>
    );
  }

  fill(filter) {
    let charactersArray = this.props.STATE.draftData.CHAMPION_DATA;
    if (filter) {
      charactersArray = charactersArray.filter((el) =>
        el.name.toLowerCase().includes(filter) ? el : null
      );
    }
    charactersArray = charactersArray.map((el, index) =>
      this.item(
        {
          index,
          champion: el.name,
          img: this.props.STATE.ENDPOINT + "/dragontail/" + el.tileImg,
          roles: ["fighter", "mage"],
          previewSrc: el.splashImg,
          suspended: el.suspended,
        },
        index * 0.02
      )
    );
    if (charactersArray.length < 8) {
      for (let i = 0; i < 8 - charactersArray.length; i++)
        charactersArray.push(<td />);
    }
    this.setState({
      charactersArray,
    });
  }

  render() {
    if (!this.props.STATE.modalVisible && this.state.confirming)
      this.setState({ confirming: false });
    return (
      <Select>
        <_Title>
          <table>
            <tbody>
              <tr>
                <td>
                  <Timer
                    resetKey={this.props.STATE.timerResetKey}
                    theme={this.props.STATE.draftData.THEME}
                    isPlaying={this.props.STATE.draftData.TEAM_ACTIVE > 0}
                    size={75}
                    seconds={this.props.STATE.draftData.TIMER.START_TIME}
                    crit={7}
                    strokeWidth={3}
                  />
                </td>
                <td>
                  <h1>
                    <b>
                      <i>Ban Phase</i>
                    </b>
                  </h1>
                </td>
              </tr>
            </tbody>
          </table>
        </_Title>
        <Container confirming={this.state.confirming}>
          {this.state.charactersArray ? (
            <Grid
              onSearchChange={(e) => this.fill(e.target.value.toLowerCase())}
              theme={"Dark"}
              fixed
              search={true}
              itemsPerRow={8}
              height={"100%"}
              filters={[
                {
                  display: (
                    <FilterWrapper>
                      <Img
                        src={
                          this.props.STATE.ENDPOINT +
                          "/" +
                          this.props.STATE.draftData.MODAL.SEARCH.FIGHTER
                        }
                      />
                    </FilterWrapper>
                  ),
                  active: true,
                  onClick: (filter) => console.log(filter.active),
                },
                {
                  display: (
                    <FilterWrapper>
                      <Img
                        src={
                          this.props.STATE.ENDPOINT +
                          "/" +
                          this.props.STATE.draftData.MODAL.SEARCH.MAGE
                        }
                      />
                    </FilterWrapper>
                  ),
                  active: true,
                  onClick: (filter) => console.log(filter.active),
                },
                {
                  display: (
                    <FilterWrapper>
                      <Img
                        src={
                          this.props.STATE.ENDPOINT +
                          "/" +
                          this.props.STATE.draftData.MODAL.SEARCH.MARKSMAN
                        }
                      />
                    </FilterWrapper>
                  ),
                  active: true,
                  onClick: (filter) => console.log(filter.active),
                },
                {
                  display: (
                    <FilterWrapper>
                      <Img
                        src={
                          this.props.STATE.ENDPOINT +
                          "/" +
                          this.props.STATE.draftData.MODAL.SEARCH.ASSASSIN
                        }
                      />
                    </FilterWrapper>
                  ),
                  active: true,
                  onClick: (filter) => console.log(filter.active),
                },
                {
                  display: (
                    <FilterWrapper>
                      <Img
                        src={
                          this.props.STATE.ENDPOINT +
                          "/" +
                          this.props.STATE.draftData.MODAL.SEARCH.TANK
                        }
                      />
                    </FilterWrapper>
                  ),
                  active: true,
                  onClick: (filter) => console.log(filter.active),
                },
                {
                  display: (
                    <FilterWrapper>
                      <Img
                        src={
                          this.props.STATE.ENDPOINT +
                          "/" +
                          this.props.STATE.draftData.MODAL.SEARCH.SUPPORT
                        }
                      />
                    </FilterWrapper>
                  ),
                  active: true,
                  onClick: (filter) => console.log(filter.active),
                },
              ]}
              items={this.state.charactersArray}
            />
          ) : null}
        </Container>
        <div className={"preview"}>
          <Transition
            trans={{
              animation: this.state.confirming ? "zoomIn" : "zoomOut",
              duration: 0.35,
            }}
          >
            <Img
              width={"100%"}
              style={{ width: "100%" }}
              src={
                this.props.STATE.ENDPOINT +
                "/dragontail/" +
                this.state.previewSrc
              }
            />
          </Transition>
        </div>
        <Transition
          trans={{
            animation: this.state.confirming ? "fadeIn" : "fadeOut",
            duration: 0.15,
          }}
        >
          <Prompt confirming={this.state.confirming}>
            <h3>Ban {this.state.select}?</h3>
            <div className={"group"}>
              <div className={"bttn"}>
                <Button
                  theme={"Light"}
                  pop
                  onClick={() =>
                    this.props.STATE[
                      this.props.STATE.draftData.DRAFT_ORDER[
                        this.props.STATE.draftData.EVENTS_LOG.length
                      ].action === "pick"
                        ? "pickChampion"
                        : "banChampion"
                    ](this.state.select, this.props.STATE.draftData.TEAM_ACTIVE)
                  }
                >
                  Confirm
                </Button>
              </div>
              <div className={"bttn"}>
                <Button
                  theme={"Light"}
                  pop
                  onClick={() => this.setState({ confirming: false })}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Prompt>
        </Transition>
      </Select>
    );
  }
}
