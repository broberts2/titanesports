import React from "react";
import { connect } from "react-redux";
import "./home_articles.css";

class HomeArticles extends React.Component {
  state = {
    domMounted: false
  };

  componentDidMount() {
    this.setState({ domMounted: true });
  }

  render() {
    return (
      <div className={"home_articles"}>
        <div className={"wrapper"}>
          <h2>
            Community Articles <i className={"fas fa-pen-fancy"}></i>
          </h2>
          <table>
            <tbody>
              <tr>
                <td>
                  <div className={"img"}>
                    <img src={require("../../img/temp.jpg")} />
                  </div>
                </td>
                <td>
                  <div className={"img"}>
                    <img src={require("../../img/temp.jpg")} />
                  </div>
                </td>
                <td>
                  <div ref={"img1"} className={"lg-img"}>
                    <img src={require("../../img/temp.jpg")} />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className={"img"}>
                    <img src={require("../../img/temp.jpg")} />
                  </div>
                </td>
                <td>
                  <div className={"img"}>
                    <img src={require("../../img/temp.jpg")} />
                  </div>
                </td>
                <td>
                  <div ref={"img1"} className={"lg-img"}>
                    <img src={require("../../img/temp.jpg")} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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
)(HomeArticles);
