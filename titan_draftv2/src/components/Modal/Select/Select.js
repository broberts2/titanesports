import React from "react";
import styled from "styled-components";
import { Img, Grid, Timer, Button, Transition } from "arclight-react";

const Select = styled.div`
  width: inherit;
  height: inherit;
`;

const _Title = styled.div`
  color: #dfdfdf;
  margin-top: 15px;
  & table {
    border-spacing: 20px 0;
  }
`;

const Container = styled.div`
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
    border: 1px solid white;
  }
`;

const Item = styled.div`
  position: relative;
  transition: all 0.35s ease;
  width: 100%;
  color: #e0e0e0;
  cursor: pointer;
  & img {
    width: 100%;
    border-radius: 3px;
    cursor: pointer;
  }
  opacity: 0.5;
  &:hover {
    opacity: 1;
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
    charactersArray: null,
    confirming: false,
  };

  componentDidMount() {
    this.fill();
  }

  item(data) {
    return (
      <Item onClick={() => this.setState({ confirming: true })}>
        <Img src={data.img} />
        <div className={"roles"}>
          {data.roles.includes("fighter") ? (
            <Img src={this.props.STATE.config.MODAL.SEARCH.FIGHTER} />
          ) : null}
          {data.roles.includes("mage") ? (
            <Img src={this.props.STATE.config.MODAL.SEARCH.MAGE} />
          ) : null}
          {data.roles.includes("marksman") ? (
            <Img src={this.props.STATE.config.MODAL.SEARCH.MARKSMAN} />
          ) : null}
          {data.roles.includes("assassin") ? (
            <Img src={this.props.STATE.config.MODAL.SEARCH.ASSASSIN} />
          ) : null}
          {data.roles.includes("tank") ? (
            <Img src={this.props.STATE.config.MODAL.SEARCH.TANK} />
          ) : null}
          {data.roles.includes("support") ? (
            <Img src={this.props.STATE.config.MODAL.SEARCH.SUPPORT} />
          ) : null}
        </div>
        <div className={"sub"}>
          <div className={"text"}>{data.champion}</div>
        </div>
      </Item>
    );
  }

  fill() {
    const charactersArray = [];
    for (let i = 0; i < 150; i++) {
      charactersArray.push(
        this.item({
          champion: "Yone",
          img: require("../img/yone_square.jpg"),
          roles: ["fighter", "mage"],
        })
      );
    }
    this.setState({ charactersArray });
  }

  render() {
    return (
      <Select>
        <_Title>
          <table>
            <tbody>
              <tr>
                <td>
                  <Timer
                    theme={this.props.STATE.config.THEME}
                    isPlaying={false}
                    size={75}
                    seconds={60}
                    crit={7}
                    strokeWidth={3}
                    onComplete={() => console.log("Timer Finished")}
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
              theme={"Dark"}
              search={true}
              itemsPerRow={8}
              height={"100%"}
              filters={[
                {
                  display: (
                    <FilterWrapper>
                      <Img src={this.props.STATE.config.MODAL.SEARCH.FIGHTER} />
                    </FilterWrapper>
                  ),
                  active: true,
                  onClick: (filter) => console.log(filter.active),
                },
                {
                  display: (
                    <FilterWrapper>
                      <Img src={this.props.STATE.config.MODAL.SEARCH.MAGE} />
                    </FilterWrapper>
                  ),
                  active: true,
                  onClick: (filter) => console.log(filter.active),
                },
                {
                  display: (
                    <FilterWrapper>
                      <Img
                        src={this.props.STATE.config.MODAL.SEARCH.MARKSMAN}
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
                        src={this.props.STATE.config.MODAL.SEARCH.ASSASSIN}
                      />
                    </FilterWrapper>
                  ),
                  active: true,
                  onClick: (filter) => console.log(filter.active),
                },
                {
                  display: (
                    <FilterWrapper>
                      <Img src={this.props.STATE.config.MODAL.SEARCH.TANK} />
                    </FilterWrapper>
                  ),
                  active: true,
                  onClick: (filter) => console.log(filter.active),
                },
                {
                  display: (
                    <FilterWrapper>
                      <Img src={this.props.STATE.config.MODAL.SEARCH.SUPPORT} />
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
        <Transition
          trans={{
            animation: this.state.confirming ? "fadeIn" : "fadeOut",
            duration: 0.35,
          }}
        >
          <Prompt confirming={this.state.confirming}>
            <h3>Ban Yone?</h3>
            <div className={"group"}>
              <div className={"bttn"}>
                <Button theme={"Light"} pop onClick={() => console.log("test")}>
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
