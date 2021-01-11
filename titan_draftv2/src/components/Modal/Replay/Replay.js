import React from "react";
import styled from "styled-components";
import { Grid, Img, Transition } from "arclight-react";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Tile = styled.div`
  transition: all 0.35s ease;
  width: 100%;
  height: 100%;
  padding: 10px;
  opacity: ${(props) => (props.id ? (props.id === props.sId ? 1 : 0.25) : 1)};
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
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 48px;
  width: calc(100% - 10px);
  font-weight: bold;
  font-style: italic;
`;

const Text = styled.div`
  position: absolute;
  top: 85%;
  transform: translateY(-85%);
  font-size: 32px;
  width: calc(100% - 10px);
`;

export default class _ extends React.Component {
  state = {
    id: 0,
  };

  tile(id, title, text) {
    return (
      <Tile id={this.state.id} sId={id}>
        <Comp
          id={this.state.id}
          sId={id}
          onMouseEnter={() => this.setState({ id })}
          onMouseLeave={() => this.setState({ id: 0 })}
        >
          <img
            src={this.props.STATE.ENDPOINT + "/static/assets/ekko_19.jpg"}
            width={"100%"}
            height={"100%"}
            style={{ objectFit: "cover", borderRadius: "4px" }}
          />
          <div style={{ margin: "10px", textAlign: "left" }}>
            <Transition
              trans={{
                animation: this.state.id === id ? "fadeInLeft" : "fadeOutRight",
              }}
            >
              <Title>{title}</Title>
            </Transition>
            <Transition
              trans={{
                animation: this.state.id === id ? "fadeInLeft" : "fadeOutRight",
                delay: 0,
              }}
            >
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
                  "Replay",
                  "Text goes here as well as a lot of other really cool stuff. Check this out! I am a very long string."
                )}
              </td>
              <td>
                {this.tile(
                  2,
                  "Replay",
                  "Text goes here as well as a lot of other really cool stuff. Check this out! I am a very long string."
                )}
              </td>
              <td>
                {this.tile(
                  3,
                  "Replay",
                  "Text goes here as well as a lot of other really cool stuff. Check this out! I am a very long string."
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </Container>
    );
  }
}
