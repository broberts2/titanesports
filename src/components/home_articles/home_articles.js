import React from "react";
import { connect } from "react-redux";
import "./home_articles.css";
import Components from "../../components";

import Api from "../../Api";

class HomeArticles extends React.Component {
  state = {
    domMounted: false,
    articles: []
  };

  async componentDidMount() {
    const articles = await Api.getArticles();
    this.setState({
      domMounted: true,
      articles: Object.values(articles.articles)
    });
  }

  builder() {
    const itemsPerRow = 3;
    let rows = [];
    let row = [];
    this.state.articles.map((el, i) => {
      if (i < itemsPerRow * 2) {
        row.push(
          <td height={"250px"}>
            {i === itemsPerRow * 2 - 1 ? (
              <Components.ArticlePanel fill />
            ) : (
              <Components.ArticlePanel data={el} />
            )}
          </td>
        );
        if ((i + 1) % itemsPerRow === 0) {
          rows.push(<tr>{row}</tr>);
          row = [];
        }
      }
    });
    if (this.state.articles.length < itemsPerRow) {
      for (let i = 0; i < itemsPerRow - this.state.articles.length; i++) {
        row.push(<td />);
      }
      rows.push(<tr>{row}</tr>);
    } else if (row.length > 0) {
      rows.push(<tr>{row}</tr>);
    }
    return (
      <table width={"100%"} style={{ tableLayout: "fixed" }}>
        <tbody>{rows}</tbody>
      </table>
    );
  }

  render() {
    return (
      <div className={"home_articles"}>
        <div className={"wrapper"}>
          <h2>
            Community Articles <i className={"fas fa-pen-fancy"}></i>
          </h2>
          {this.builder()}
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
