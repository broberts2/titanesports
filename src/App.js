import React, { Component } from "react";
import Header from "./components/header";
import VideoBackground from "./components/video_background";
import Articles from "./components/articles";
import Content from "./components/content";
import Features from "./components/features";
import modals from "./components/modals/_modals";
import WelcomeButton from "./components/welcome_button";
import MediaLink from "./media_links";
import api from "./api";
import "./index.css";
import "./kristen.css";

const article_model = {
  imgURL: ``,
  title: ``,
  p: ``,
  date: ``,
  metaData: {
    comments: 0,
    likes: 0,
    views: 0
  },
  content: [""]
};

class App extends Component {
  state = {
    modal: 0,
    modals: null,
    userLogged: false,
    searchTerm: "",
    batchSearchTerm: [],
    articles: [],
    activeArticle: article_model
  };

  closeModal() {
    this.setState({ modal: 0 });
  }

  setMenu(modal) {
    this.setState({ modal });
  }

  modalActions = {
    setMenu: num => this.setMenu(num),
    showUser: userLogged => this.setState({ userLogged }),
    setSearchTerm: searchTerm => this.setState({ searchTerm }),
    setBatchSearchTerm: batchSearchTerm => this.setState({ batchSearchTerm })
  };

  async componentDidMount() {
    const articles = await api.get_articles();
    this.setState({ articles });
    console.log(this.state.articles);
  }

  render() {
    return (
      <div>
        <Header
          userLogged={this.state.userLogged}
          showUser={userLogged => this.setState({ userLogged })}
          modalAction={{
            activateLeagues: () => this.setMenu(1),
            activateMiniMenu: () => this.setMenu(3),
            activateUserProfile: () => this.setMenu(7)
          }}
        />
        {modals(
          this.state.modal,
          this.state.searchTerm,
          this.state.batchSearchTerm,
          () => this.closeModal(),
          this.state.activeArticle,
          this.modalActions
        )}
        <VideoBackground />
        <Content img={require("./img/lol_logo.png")}>
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
                        Check out our Discord, Twitch, and Youtube channels!
                      </p>
                    </div>
                    <a href={MediaLink.discord} target={"_blank"}>
                      <div className="linkButton">
                        <div className={`fab fa-discord fa-2x`} />
                      </div>
                    </a>
                    <a href={MediaLink.twitch} target={"_blank"}>
                      <div className="linkButton">
                        <div className={`fab fa-twitch fa-2x`} />
                      </div>
                    </a>
                    <a href={MediaLink.youTube} target={"_blank"}>
                      <div className="linkButton">
                        <div className={`fab fa-youtube fa-2x`} />
                      </div>
                    </a>
                    <a>
                      <div
                        className="linkButton"
                        onClick={() => this.setMenu(1)}
                      >
                        <div className={`fas fa-file-signature fa-2x`} />
                      </div>
                    </a>
                  </div>
                </div>
                <div
                  className="theSection"
                  style={{ marginTop: "30px", borderRadius: "10px" }}
                >
                  <Articles
                    articles={this.state.articles}
                    userLogged={this.state.userLogged}
                    setArticle={i => {
                      if (i < 0) {
                        this.setMenu(17);
                      } else {
                        this.setMenu(16);
                        this.setState({
                          activeArticle: this.state.articles[i]
                        });
                      }
                    }}
                  />
                  <div className="row" style={{ marginTop: "15px" }}>
                    <div className="col">
                      <div className="theCards">
                        <img src={require("./img/summoner.png")} alt />
                        <div
                          className="linkButton"
                          onClick={() => this.setMenu(10)}
                        >
                          Player Search
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="theCards">
                        <img src={require("./img/teams.png")} alt />
                        <div
                          className="linkButton"
                          onClick={() => this.setMenu(12)}
                        >
                          Team Search
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="theCards">
                        <img src={require("./img/events.png")} alt />
                        <div
                          className="linkButton"
                          onClick={() => this.setMenu(9)}
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
        <WelcomeButton action={() => this.setMenu(6)} />
      </div>
    );
  }
}

export default App;
