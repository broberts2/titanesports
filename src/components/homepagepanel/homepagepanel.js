import React from "react";
import { connect } from "react-redux";
import "./homepagepanel.css";

const vid1 = require("./videos/animated-ionia.webm");
const vid2 = require("./videos/animated-noxus.webm");
const vid3 = require("./videos/animated-shurima.webm");
const vid4 = require("./videos/animated-bilgewater.webm");
const vid5 = require("./videos/animated-piltover.webm");
// "animated-piltover.webm"
// animated-harrowing-2014.webm

class HomePagePanel extends React.Component {
  state = {
    domMounted: false
  };

  videoButton(ref, src) {
    return (
      <video
        ref={ref}
        onMouseEnter={() => this.refs[ref].play()}
        onMouseLeave={() => this.refs[ref].pause()}
        muted
        preload="auto"
        loop
      >
        <source src={src} type={"video/webm"} />
      </video>
    );
  }

  renderPanels() {
    return (
      <div className={"panels"}>
        <div className={"wrapper panel-1"}>
          {this.videoButton("vid1", vid1)}
          <h2>Player Search</h2>
          <i className={"fas fa-user"}></i>
        </div>
        <div className={"wrapper panel-2"}>
          {this.videoButton("vid2", vid2)}
          <h2>Team Search</h2>
          <i className={"fas fa-users"}></i>
        </div>
        <div className={"wrapper panel-3"}>
          {this.videoButton("vid3", vid3)}
          <h2>Upcoming Events</h2>
          <i className={"far fa-calendar-alt"}></i>
        </div>
        <div className={"wrapper panel-4"}>
          {this.videoButton("vid4", vid4)}
          <h2>About TES</h2>
          <i className={"fas fa-info"}></i>
        </div>
        <div className={"wrapper panel-5"}>
          {this.videoButton("vid5", vid5)}
          <h2>TES Roster Update</h2>
          <i className={"fas fa-scroll"}></i>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.setState({ domMounted: true });
  }

  render() {
    return (
      <div className={"homepagepanel"}>
        {this.renderPanels()}
        <div className={"snip"}>
          <h1>Welcome to Titan eSports!</h1>
          <p>
            We are a non-profit league seeking to provide high quality matches
            within a competative 5v5 environment. We believe that League of
            Legends is best experienced within the context of strong, team
            oriented gameplay where cooperation and strategy take priority over
            individual skill. We look forward seeing you all on the Rift!
          </p>
        </div>
        <div className={"box"}>
          <h1>TES Mission Statement</h1>
          <p>
            Titan Esports mission is simple at its core—promote a friendly,
            engaging, competitive gaming environment for all of the dedicated
            members of our esteemed community. TES was founded by a group of
            friends who came together almost a decade ago with the same common
            goals:
            <div style={{ margin: "15px" }}>
              <div>~ Excellence</div>
              <div>~ Community</div>
              <div>~ Hospitality</div>
              <div>~ Competitive Fairness</div>
            </div>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePagePanel);