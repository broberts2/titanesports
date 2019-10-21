import React from "react";
import { connect } from "react-redux";
import "./header.css";

import Components from "../../components";

import Api from "../../Api";

const { read_cookie } = require("sfcookies");

class Header extends React.Component {
  state = {
    accountLink: (
      <div
        className={"imposter"}
        onClick={() => this.openModal(Components.Login)}
        href={"/"}
      >
        Sign In
      </div>
    ),
    modalVisible: false,
    modal: Components.Login
  };

  async componentDidMount() {
    const res = await Api.validateToken();
    if (read_cookie("titan_key").length > 0) {
      this.setState({
        accountLink: <a href={`/user?u=${res.id}`}>My Account</a>
      });
    }
  }

  setModal(modalVisible) {
    this.setState({ modalVisible });
  }

  openModal(modal) {
    this.setState({ modalVisible: false, modal });
    setTimeout(() => this.setState({ modalVisible: true }), 250);
  }

  render() {
    return (
      <div className={"header"}>
        <Components.Modal
          width={"75%"}
          height={"75%"}
          openModal={modal => this.openModal(modal)}
          setModal={modalVisible => this.setModal(modalVisible)}
          visible={this.state.modalVisible}
          content={this.state.modal}
        />
        <img alt={""} src={require("../../img/logo2.png")} />
        <div className={"links"}>
          <div>
            <a href={"/"}>Home</a>|<a href={"/about.html"}>About</a>|
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
