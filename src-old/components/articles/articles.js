import React from "react";
import { connect } from "react-redux";
import Components from "../../components";
import IconIndex from "../article/icon_index";
import "./articles.css";

import Api from "../../Api";

class Articles extends React.Component {
  state = {
    domMounted: false,
    modalVisible: false,
    params: Object.assign({}, Object.keys(IconIndex).map(() => true)),
    modalSize: {
      width: "45%",
      height: "75%"
    },
    query: "",
    articles: []
  };

  async componentDidMount() {
    const user = await Api.validateToken();
    const articles = await Api.getArticles();
    this.setState({
      user,
      domMounted: true,
      articles: Object.values(articles.articles)
    });
  }

  openModal(modal, size) {
    this.setState({ modalVisible: false, modal, modalSize: size });
    setTimeout(() => this.setState({ modalVisible: true }), 250);
  }

  setModal(modalVisible) {
    this.setState({ modalVisible });
  }

  superSort(arr) {
    const excl = el =>
      el.title.toLowerCase().includes(this.state.query) ||
      el.date_created
        .toLowerCase()
        .toString()
        .includes(this.state.query) ||
      el.author.toLowerCase().includes(this.state.query);
    const checkParams = el => {
      let boolean = false;
      Object.keys(IconIndex).map(i => {
        if (el.icon.includes(parseInt(i)) && this.state.params[i]) {
          boolean = true;
        }
      });
      return boolean;
    };
    const checkPriveleges = el =>
      this.state.user.l < 2 ||
      (this.state.user && this.state.user.username === el.author) ||
      el.status > 0;
    return arr.filter(el => {
      if (checkParams(el) && checkPriveleges(el)) {
        if (this.state.query.length > 0) {
          if (excl(el)) {
            return el;
          } else {
            return null;
          }
        } else {
          return el;
        }
      } else {
        return null;
      }
    });
  }

  builder() {
    const itemsPerRow = 3;
    let rows = [];
    let row = [];
    let arr = this.state.articles
      .sort((a, b) => (a.date_created > b.date_created ? 1 : -1))
      .sort((a, b) => (a.icon.includes(0) ? -1 : b.icon.includes(0) ? 1 : -1));
    this.superSort(arr).map((el, i) => {
      row.push(
        <td height={"300px"}>
          <Components.ArticlePanel data={el} />
        </td>
      );
      if ((i + 1) % itemsPerRow === 0) {
        rows.push(<tr>{row}</tr>);
        row = [];
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
      <table>
        <tbody>{rows}</tbody>
      </table>
    );
  }

  toggleParam(index) {
    let params = this.state.params;
    params[index] = !this.state.params[index];
    this.setState({ params });
  }

  render() {
    return (
      <div className={"articles"}>
        <Components.Loader domMounted={this.state.domMounted}>
          <Components.Header
            openModal={() => this.openModal(<Components.Login />)}
          />
          <Components.Modal
            width={this.state.modalSize.width}
            height={this.state.modalSize.height}
            openModal={modal =>
              this.openModal(modal, {
                width: "45%",
                height: "75%"
              })
            }
            setModal={modalVisible => this.setModal(modalVisible)}
            visible={this.state.modalVisible}
          >
            {this.state.modal}
          </Components.Modal>
          <div className={"body"}>
            <h1>Community Articles</h1>
            <div className={"icons"}>
              <table>
                <tbody>
                  <tr>
                    {Object.values(IconIndex).map((el, i) => (
                      <td>
                        <div
                          className={"ico"}
                          style={
                            !this.state.params[i] ? { opacity: "0.25" } : {}
                          }
                          onClick={() => this.toggleParam(i)}
                        >
                          {el}
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
              <input
                placeholder={"Search by Title, Author or Date"}
                value={this.state.query}
                onChange={e =>
                  this.setState({ query: e.target.value.toLowerCase() })
                }
              />
            </div>
            {this.builder()}
          </div>
          <Components.Footer />
        </Components.Loader>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Articles);
