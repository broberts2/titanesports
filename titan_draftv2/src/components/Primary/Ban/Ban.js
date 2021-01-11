import React from "react";
import styled from "styled-components";
import { Transition } from "arclight-react";

const Ban = styled.div`
  width: 100%;
  position: relative;
  & img {
    top: 0;
    left: 0;
    position: absolute;
    border-radius: 50%;
  }
`;

const Text = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  font-weight: bold;
  font-style: italic;
  color: white;
  font-size: 0.75vw;
`;

export default class _ extends React.Component {
  state = { loaded: false, c: 0, lim: this.props.play ? 3 : 1 };

  componentDidUpdate(newProps) {
    if (this.props.play !== newProps.play) {
      this.setState({ loaded: false });
    }
  }

  incLoad() {
    if (!this.state.loaded && ++this.state.c >= this.state.lim) {
      this.setState({ loaded: true });
    }
  }

  render() {
    const Img1 = (
      <img
        onLoad={this.incLoad()}
        src={this.props.source}
        width={"70%"}
        style={{
          paddingTop: "10%",
          left: "68%",
          transform: "translateX(-68%)",
        }}
      />
    );
    const Img2 = (
      <img onLoad={this.incLoad()} src={this.props.border} width={"100%"} />
    );
    const Img3 = (
      <img
        onLoad={this.incLoad()}
        src={this.props.banLock}
        width={this.props.play ? "25%" : "100%"}
      />
    );
    return (
      <Transition
        trans={
          this.props.play
            ? this.props.play
            : {
                animation: this.props.loadAnims.anim,
                delay: this.props.loadAnims.delay,
              }
        }
      >
        <Ban>
          {this.props.play ? (
            <React.Fragment>
              {Img1}
              {Img2}
              {Img3}
              <Text>{this.props.name}</Text>
            </React.Fragment>
          ) : (
            Img3
          )}
        </Ban>
      </Transition>
    );
  }
}
