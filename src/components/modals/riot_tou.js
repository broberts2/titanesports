import React, { Component } from "react";
import Modal from "react-awesome-modal";
import { AwesomeButton } from "react-awesome-button";

export default class RiotTermsOfUse extends Component {
  render() {
    return (
      <Modal
        visible={this.props.visible === this.props.index ? true : false}
        width={"75%"}
        height={"75%"}
        effect={"fadeInUp"}
        onClickAway={() => this.props.closeModal()}
      >
        <div className={"modal-style"}>
          <div className={"terms-of-use"}>
            <div className={"content"}>
              <center>
                <h1>Riot API Terms of Use</h1>
              </center>
              <i>
                <p>
                  You are responsible to ensure a fair and balanced system for
                  matchmaking teams. All features of your project must be freely
                  available to every tournament participant. A tournament must
                  have a minimum of 20 active participants, regardless of team
                  size (1v1, 3v3, 5v5 etc). Teams must progress through the
                  tournament by playing directly against their opponents. It
                  must be a traditional style tournament (elimination, round
                  robin, etc) and not direct challenges or ladder systems.
                </p>
                <p>
                  SEED DATA We offer static seed data to help get you started.
                </p>
                <p>
                  The seed data contains 1,000 ranked solo queue games, but no
                  games from any other queue type. The seed data is split into
                  10 files named matches1.json through matches10.json. The seed
                  data will be updated whenever changes are made to the match
                  API. You can find the seed data in our S3 bucket in AWS:
                  https://s3-us-west-1.amazonaws.com/riot-developer-portal/seed-data/
                </p>
                <p>
                  The directory itself is inaccessible, but the match files can
                  be directly downloaded:
                  https://s3-us-west-1.amazonaws.com/riot-developer-portal/seed-data/matches1.json
                  https://s3-us-west-1.amazonaws.com/riot-developer-portal/seed-data/matches10.json
                </p>
              </i>
              <center>
                <div onClick={() => this.props.closeModal()}>
                  <AwesomeButton
                    style={{
                      width: "150px",
                      height: "35px",
                      marginTop: "30px"
                    }}
                    type={"primary"}
                    size={"large"}
                  >
                    <h3>Got it!</h3>
                  </AwesomeButton>
                </div>
              </center>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}
