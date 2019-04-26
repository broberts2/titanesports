import React, { Component } from "react";
import Header from "./header";
import VideoBackground from "./video_background";
import Articles from "./articles";
import Content from "./content";
import Features from "./features";
import modals from "./modals/_modals";
import WelcomeButton from "./welcome_button";
import MediaLink from "../media_links";
import api from "../utils/api";

class Base extends Component {
  render() {
    return (
      <div>
        <Header state={this.props.state} actions={this.props.actions} />
        <VideoBackground />
        <Content img={require("../img/lol_logo.png")}>
          <div className="container-fluid">
            <div
              style={{
                margin: "auto",
                padding: "15px 0px"
              }}
            >
              <div className="row">
                <div className="row">
                  <div
                    className="row topBlocks"
                    style={{ borderBottom: "solid 1px #1F1F1F" }}
                  >
                    <div className="col-1 announceIcon">
                      <img src="https://titan-esports.org/static/media/logo.e0299d28.png" />
                    </div>
                    <div className="col" style={{ paddingTop: "10px" }}>
                      <h4>
                        Titan Esports Summer Invitational League
                        &nbsp;&nbsp;&nbsp;<span className="announceDate">
                          04/07/19
                        </span>
                      </h4>
                      <p>
                        Hello thlks lks dfkjn asd;lkf al;sdkjfh ljsdhfl
                        kjafijansdf ijsn dfijns dkfjsdkfjhskdjfhsdkjfh sjkh
                        dfksjh sfkjhsf kjhsdfkjhsdf kjhsdfkj dhskjsfh ksjdhf
                        ksjdfh
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div
                    className="row topBlocks"
                    style={{ marginTop: "30px", padding: "15px 5px" }}
                  >
                    <div className="col">
                      <h2>External Links</h2>
                      <p>
                        Check out our Discord, Twitch, and Youtube channels or
                        apply for a team!
                      </p>
                    </div>
                    <a href={MediaLink.discord} target={"_blank"}>
                      <div className="linkButton">
                        <div className={`fab fa-discord fa-4x`} />
                      </div>
                    </a>
                    <a href={MediaLink.twitch} target={"_blank"}>
                      <div className="linkButton">
                        <div className={`fab fa-twitch fa-4x`} />
                      </div>
                    </a>
                    <a href={MediaLink.youTube} target={"_blank"}>
                      <div className="linkButton">
                        <div className={`fab fa-youtube fa-4x`} />
                      </div>
                    </a>
                    <a>
                      <div
                        className="linkButton"
                        onClick={() => this.props.actions.setMenu(1)}
                      >
                        <div className={`fas fa-file-signature fa-4x`} />
                      </div>
                    </a>
                  </div>
                </div>
                <div
                  className="theSection"
                  style={{ marginTop: "30px", borderRadius: "10px" }}
                >
                  <Articles
                    articles={this.props.state.articles}
                    userLogged={this.props.state.userLogged}
                    setArticle={i => {
                      i < 0
                        ? this.props.actions.setMenu(17)
                        : this.props.actions.setMenu(16);
                      this.props.actions.setArticle(i);
                    }}
                  />
                  <div className="row" style={{ marginTop: "15px" }}>
                    <div className="col">
                      <div className="theCards">
                        <img src={require("../img/summoner.png")} alt />
                        <div
                          className="linkButton"
                          onClick={() => {
                            this.props.actions.setUsers();
                            this.props.actions.setMenu(10);
                          }}
                        >
                          Player Search
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="theCards">
                        <img src={require("../img/teams.png")} alt />
                        <div
                          className="linkButton"
                          onClick={async () => {
                            await this.props.actions.setTeams();
                            this.props.actions.setMenu(12);
                          }}
                        >
                          Team Search
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="theCards">
                        <img src={require("../img/events.png")} alt />
                        <div
                          className="linkButton"
                          onClick={() => this.props.actions.setMenu(9)}
                        >
                          Upcoming Events
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="footerBar">
                  <div className="row">
                    <div className="col sm-6 md-3">
                      <h3>About Titan Esports</h3>
                      <p>
                        Titan Esports mission is simple at its core -- promote a
                        friendly, engaging, comptetitive gaming environment for
                        all of the dedicated members of our esteemed community,
                        an dto ensure competitive fairness.
                      </p>
                    </div>
                    <div className="col sm-6 md-3">
                      <h3>TES Social Media</h3>
                      <div className="row">
                        <div className="col-6 socials">
                          <div className="socialIcon">
                            <i className="fab fa-twitch" />
                          </div>
                          Twitch
                        </div>
                        <div className="col-6 socials">
                          <div className="socialIcon">
                            <i className="fab fa-youtube" />
                          </div>
                          Youtube
                        </div>
                        <div className="col-6 socials">
                          <div className="socialIcon">
                            <i className="fab fa-twitter" />
                          </div>
                          Twitter
                        </div>
                        <div className="col-6 socials">
                          <div className="socialIcon">
                            <i className="fab fa-instagram" />
                          </div>
                          Instagram
                        </div>
                        <div className="col-6 socials">
                          <div className="socialIcon">
                            <i className="fab fa-facebook-f" />
                          </div>
                          Facebook
                        </div>
                        <div className="col-6 socials">
                          <div className="socialIcon">
                            <i className="fab fa-steam-symbol" />
                          </div>
                          Steam
                        </div>
                      </div>
                    </div>
                    <div className="col sm-6 md-3">
                      <h3>TES Contact &amp; Support</h3>
                      <div className="linkButton-unfinished">Contact Us</div>
                      <div
                        className="linkButton-unfinished"
                        style={{ marginTop: "15px" }}
                      >
                        Sponsorships
                      </div>
                    </div>
                    <div className="col sm-6 md-3">
                      <h3>Recruitment video</h3>
                      <iframe
                        width="100%"
                        height="85%"
                        src="https://www.youtube.com/embed/zF5Ddo9JdpY"
                        frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Content>
        <WelcomeButton actions={this.props.actions} />
      </div>
    );
  }
}

export default Base;
