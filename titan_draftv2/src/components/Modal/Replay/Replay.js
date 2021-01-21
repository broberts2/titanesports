import React from "react";
import styled from "styled-components";
import { Grid, Img, Transition } from "arclight-react";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Tile = styled.div`
  pointer-events: ${(props) => (props.dFinish ? "none" : "auto")};
  transition: all 0.35s ease;
  width: 100%;
  height: 100%;
  padding: 10px;
  opacity: ${(props) => (props.id && !props.dFinish ? (props.id === props.sId ? 1 : 0.25) : (props.dFinish ? 0.25 : 1))};
  color: white;
`;

const Comp = styled.div`
  position: relative;
  width: calc(100% - 20px);
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  background-color: black;
  border-radius: 4px;
  & img {
    transition: all 0.35s ease;
    opacity: ${(props) => (props.id === props.sId ? 0.35 : 1)};
  }
`;

const Title = styled.div`
  font-size: 48px;
  font-weight: bold;
  font-style: italic;
  width: calc(100% - 40px);
`;

const Text = styled.div`
  font-size: 32px;
  padding: 50% 0;
  width: calc(100% - 40px);
`;

export default class _ extends React.Component {
  state = {
    id: 0,
  };

  tile(id, title, text, src, cb, dFinish) {
    return (
      <Tile id={this.state.id} sId={id} dFinish={dFinish}>
        <Comp
          onClick={() => cb ? cb() : null}
          id={this.state.id}
          sId={id}
          onMouseEnter={() => this.setState({ id })}
          onMouseLeave={() => this.setState({ id: 0 })}
        >
          <img
            src={this.props.STATE.ENDPOINT + src}
            width={"100%"}
            height={"100%"}
            style={{ objectFit: "cover", borderRadius: "4px" }}
          />
          <div style={{ position: "absolute", width: "100%", height: "75vh", top: 0, left: 0, textAlign: "left", padding: "20px" }}>
            <Transition
              trans={{
                animation: this.state.id === id ? "fadeInLeft" : "fadeOutRight",
              }}
            >
              <Title>{title}</Title>
              <Text>{text}</Text>
            </Transition>
          </div>
        </Comp>
      </Tile>
    );
  }

  render() {
    return (
      <Container>
        <table width={"100%"} height={"100%"}>
          <tbody>
            <tr>
              <td>
                {this.tile(
                  1,
                  "True Replay",
                  "View the finished draft in a true time replay!",
                  "/static/assets/ekko_19.jpg",
                  () => this.props.STATE.runReplay()
                )}
              </td>
              <td>
                {this.tile(
                  2,
                  "Fast Replay",
                  "View a hastened replay of the draft. This will replay the events over a span of 2 minutes... Perfect for streamers on a tight schedule!",
                  "/static/assets/ekko_20.jpg", 
                  () => this.props.STATE.runReplay(true)
                )}
              </td>
              <td>
                {this.tile(
                  3,
                  "View Current",
                  "Disconnected or late to the party? View the current draft in progress!",
                  "/static/assets/ekko_1.jpg", 
                  null,
                  this.props.STATE.draftData.EVENTS_LOG.length >= 20
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </Container>
    );
  }
}
