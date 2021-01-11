import React from "react";
import styled from "styled-components";
import { Transition } from "arclight-react";

const Constraints = styled.div`
  position: relative;
  padding-top: 142.25%;
  width: 100%;
  overflow: hidden;
  font-size: 1.5vw;
`;

const Card = styled.div`
  ${(props) => (props.zIndex ? `z-index: ${props.zIndex};` : null)}
  & img {
    opacity: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
`;

const Sub = styled.div`
  & img {
    height: 98%;
    -webkit-mask-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(rgba(0, 0, 0, 1)),
      to(rgba(0, 0, 0, 0))
    );
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  }
`;

const Text = styled.div`
  position: absolute;
  bottom: 5%;
  right: 7.5%;
  font-weight: bold;
  font-style: italic;
  color: white;
`;

const BackDrop = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 98%;
  background-color: #141414;
`;

export default class _ extends React.Component {
  state = { loaded: true, c: 0, lim: 2 };

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
        src={this.props.play ? this.props.source : this.props.cardBack}
      />
    );
    const Img2 = <img onLoad={this.incLoad()} src={this.props.border} />;
    return (
      <div>
        {this.state.loaded ? (
          <Transition
            trans={{
              animation: this.props.loadAnims.anims[0],
              delay: this.props.loadAnims.delay,
            }}
          >
            <Transition
              trans={
                this.props.play
                  ? this.props.play
                  : {
                      animation: this.props.loadAnims.anims[1],
                      delay: this.props.loadAnims.delay + 0.2,
                    }
              }
            >
              <Constraints>
                <Card zIndex={this.props.zIndex}>
                  <BackDrop />
                  <Sub>{Img1}</Sub>
                  {Img2}
                </Card>
                {this.props.play ? <Text>{this.props.name}</Text> : null}
              </Constraints>
            </Transition>
          </Transition>
        ) : null}
      </div>
    );
  }
}
