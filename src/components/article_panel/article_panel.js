import React from "react";
import { connect } from "react-redux";
import Components from "../../components";
import "./article_panel.css";
import moment from "moment";

class ArticlePanel extends React.Component {
  state = {
    domMounted: false,
    modalVisible: false,
    modalSize: {
      width: "45%",
      height: "75%"
    }
  };

  componentDidMount() {
    this.setState({ domMounted: true });
  }

  openModal(modal, size) {
    this.setState({ modalVisible: false, modal, modalSize: size });
    setTimeout(() => this.setState({ modalVisible: true }), 250);
  }

  setModal(modalVisible) {
    this.setState({ modalVisible });
  }

  render() {
    return (
      <a
        href={
          this.props.fill ? `/articles` : `/article?id=${this.props.data._id}`
        }
        target={"_blank"}
      >
        <div className={"article_panel"}>
          <div className={"background-img"}>
            <img
              style={this.props.fill ? { opacity: "0.5" } : {}}
              src={
                this.props.fill
                  ? require("../../img/fill.jpg")
                  : this.props.data.img_path
              }
            />
          </div>
          {!this.props.fill ? (
            <div style={{ width: "100%", height: "100%" }}>
              <div className={"icon"}>
                <i className={this.props.data.icon} />
              </div>
              <div className={"body"}>
                <div className={"fade"}>
                  <h1>{this.props.data.title}</h1>
                </div>
                <div className={"fade"}>
                  <h3>
                    {moment(this.props.data.date)
                      .format("MMM Do, YYYY")
                      .toString()}
                  </h3>
                </div>
                <div className={"author"}>
                  <div className={"reverse-fade"}>
                    <h4>{this.props.data.author}</h4>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className={"fill"}>
              <h1>All Articles</h1>
              <i className={"fas fa-share"} />
            </div>
          )}
        </div>
      </a>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlePanel);
