import React, { Component } from "react";
import Header from "./components/header";
import VideoBackground from "./components/video_background";
import Content from "./components/content";
import Features from "./components/features";
import modals from "./components/modals/_modals";
import WelcomeButton from "./components/welcome_button";
import api from "./api";
import "./index.css";
import "./kristen.css";

class App extends Component {
  state = {
    modal: 0,
    modals: null,
    headerTitle: api.get_cookie("titan_id") || ""
  };

  closeModal() {
    this.setState({ modal: 0 });
  }

  setMenu(modal) {
    this.setState({ modal });
  }

  setHeaderTitle(headerTitle) {
    this.setState({ headerTitle });
  }

  render() {
    return (
      <div>
        <Header
          headerTitle={this.state.headerTitle}
          modalAction={{
            activateLeagues: () => this.setMenu(1),
            activateMiniMenu: () => this.setMenu(3)
          }}
        />
        {modals(this.state.modal, () => this.closeModal(), {
          setMenu: num => this.setMenu(num),
          setHeaderTitle: headerTitle => this.setHeaderTitle(headerTitle)
        })}
        <VideoBackground />
        <Content img={require("./img/lol_logo.png")}>
          <div>
            <div className="container-fluid">
              <div
                style={{
                  maxWidth: "1400px",
                  margin: "auto",
                  padding: "15px 0px"
                }}
              >
                <div className="row">
                  <div className="col-md-9">
                    <div className="grayGrad">
                      <h3>Announcements</h3>
                    </div>
                    <div
                      className="row topBlocks"
                      style={{ borderBottom: "solid 5px #1F1F1F" }}
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
                    <div
                      className="row topBlocks"
                      style={{ marginTop: "30px", padding: "15px 5px" }}
                    >
                      <div className="col">
                        <h2>Titan Esports Community Website</h2>
                        <p>
                          Stay up to date with the latest news and events from
                          teh Titan Esports Community!
                        </p>
                      </div>
                      <div className="col-3">
                        <div className="folderButton-unfinished">
                          <i className="fas fa-folder-open" /> Show all
                          categories
                        </div>
                      </div>
                    </div>
                    <div
                      className="theSection"
                      style={{ marginTop: "30px", borderRadius: "10px" }}
                    >
                      <div className="row">
                        <div className="col">
                          <div className="theCards">
                            <img
                              src="https://pmcvariety.files.wordpress.com/2018/11/kda.jpg"
                              alt
                            />
                            <h3>Titan Esports Summer Invitational</h3>
                            <p>
                              By <a href>Phortwenty</a>, in{" "}
                              <a href>Community Updates</a>, April 7
                              <br />7 comments / 3 Likes / 978 Views
                            </p>
                          </div>
                        </div>
                        <div className="col">
                          <div className="theCards">
                            <img
                              src="https://pmcvariety.files.wordpress.com/2018/11/kda.jpg"
                              alt
                            />
                            <h3>Titan Esports Summer Invitational</h3>
                            <p>
                              By <a href>Phortwenty</a>, in{" "}
                              <a href>Community Updates</a>, April 7
                              <br />7 comments / 3 Likes / 978 Views
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="row" style={{ marginTop: "15px" }}>
                        <div className="col">
                          <div className="theCards">
                            <img
                              src="https://pmcvariety.files.wordpress.com/2018/11/kda.jpg"
                              alt
                            />
                            <div
                              className="linkButton"
                              onClick={() => this.setMenu(5)}
                            >
                              Players and Teams
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          <div className="theCards">
                            <img
                              src="https://pmcvariety.files.wordpress.com/2018/11/kda.jpg"
                              alt
                            />
                            <div className="linkButton-unfinished">
                              Watch Our Latest Match
                            </div>
                          </div>
                        </div>
                        <div className="col">
                          <div className="theCards">
                            <img
                              src="https://titan-esports.org/static/media/logo.e0299d28.png"
                              alt
                            />
                            <div className="linkButton-unfinished">
                              Join Our Team
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
                            Titan Esports mission is simple at its core --
                            promote a friendly, engaging, comptetitive gaming
                            environment for all of the dedicated members of our
                            esteemed community, an dto ensure competitive
                            fairness.
                          </p>
                        </div>
                        <div className="col sm-6 md-3">
                          <h3>TES Social Media</h3>
                          <div className="row">
                            <div className="col-6 socials">
                              <div className="socialIcon">
                                <i className="fab fa-twitch" />
                              </div>{" "}
                              Twitch
                            </div>
                            <div className="col-6 socials">
                              <div className="socialIcon">
                                <i className="fab fa-youtube" />
                              </div>{" "}
                              Youtube
                            </div>
                            <div className="col-6 socials">
                              <div className="socialIcon">
                                <i className="fab fa-twitter" />
                              </div>{" "}
                              Twitter
                            </div>
                            <div className="col-6 socials">
                              <div className="socialIcon">
                                <i className="fab fa-instagram" />
                              </div>{" "}
                              Instagram
                            </div>
                            <div className="col-6 socials">
                              <div className="socialIcon">
                                <i className="fab fa-facebook-f" />
                              </div>{" "}
                              Facebook
                            </div>
                            <div className="col-6 socials">
                              <div className="socialIcon">
                                <i className="fab fa-steam-symbol" />
                              </div>{" "}
                              Steam
                            </div>
                          </div>
                        </div>
                        <div className="col sm-6 md-3">
                          <h3>TES Contact &amp; Support</h3>
                          <div className="linkButton-unfinished">
                            Contact Us
                          </div>
                          <div className="linkButton-unfinished">
                            Sponsorships
                          </div>
                        </div>
                        <div className="col sm-6 md-3">
                          <h3>Recruitment video</h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md">
                    <div className="theSection">
                      <div className="linkButton-unfinished">
                        Sign Up Today!
                      </div>
                      <p style={{ padding: "10px" }}>
                        some extra text alsdkh jjsdhf kljhd flkjh lkjd lkdsj
                        lkjsdfl kjsdlfk jsdlfkj sdljk sldfjlkdj
                        flkjsdlfjsldfjlkdsjf lk jlk sjdlk sdjlj slkj sds df sfs
                        dfs dfs fs dfsd fsdfsd fsdf sdf sdf sdf sdf
                      </p>
                      <div className="row sign">
                        <div className="col-2">
                          <i className="fas fa-key" />
                        </div>
                        <div className="col">
                          <div
                            className="linkButton"
                            onClick={() => this.setMenu(6)}
                          >
                            {api.get_cookie("titan_key")
                              ? "Sign Out"
                              : "Sign In"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="theSection" style={{ marginTop: "15px" }}>
                      <div className="linkButton-unfinished">
                        Upcoming Events
                      </div>
                      <div className="rssSpot" />
                    </div>
                    <div className="theSection" style={{ marginTop: "15px" }}>
                      <div className="linkButton-unfinished">
                        Titan Esports Sponsor
                      </div>
                      <div className="rssSpot" style={{ padding: "15px" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Content>
        <WelcomeButton />
      </div>
    );
  }
}

export default App;
