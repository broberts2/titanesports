import React from "react";
import { connect } from "react-redux";
import "./header.css";

const { read_cookie } = require("sfcookies");

class Header extends React.Component {
  state = {
    accountLink: <a href={"/contact.html"}>Sign In</a>
  };

  componentDidMount() {
    if (read_cookie("titan_key").length > 0) {
      this.setState({ accountLink: <a href={"/contact.html"}>My Account</a> });
    }
  }

  render() {
    return (
      <div className={"header"}>
        <img alt={""} src={require("../../img/logo2.png")} />
        <div className={"links"}>
          <div>
            <a href={"/index.html"}>Home</a>|<a href={"/about.html"}>About</a>|
            <a href={"/articles.html"}>Articles</a>|
            <a href={"/events.html"}>Events</a>|
            <a href={"/contact.html"}>Contact</a>|{this.state.accountLink}
          </div>
          <div>
            <a href={"https://www.twitch.tv/titanesportz"} target={"_blank"}>
              <i className={"fab fa-twitch"}></i>
            </a>
            <a href={"https://discord.gg/9DPxcfp"} target={"_blank"}>
              <i className={"fab fa-discord"}></i>
            </a>
            <a
              href={"https://www.reddit.com/user/Titan_eSports"}
              target={"_blank"}
            >
              <i className={"fab fa-reddit-square"}></i>
            </a>
            <a
              href={"https://www.youtube.com/channel/UCo5klVtSLp2YLch8ye_FBRw"}
              target={"_blank"}
            >
              <i className={"fab fa-youtube"}></i>
            </a>
            <a href={"contact.html"}>
              <i className={"fas fa-envelope"}></i>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Header);
