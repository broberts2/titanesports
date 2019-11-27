import React from "react";
import { connect } from "react-redux";
import Components from "../../components";
import "./home.css";

class Home extends React.Component {
  state = {
    domMounted: false,
    modalVisible: false,
    modal: <Components.Login />,
    modalSize: {
      width: "45%",
      height: "75%"
    }
  };

  componentDidMount() {
    setTimeout(() => this.setState({ domMounted: true }), 1000);
  }

  setModal(modalVisible) {
    this.setState({ modalVisible });
  }

  openModal(modal, size) {
    this.setState({ modalVisible: false, modal, modalSize: size });
    setTimeout(() => this.setState({ modalVisible: true }), 250);
  }

  render() {
    return (
      <div className={"home"}>
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
          <Components.VideoLoop
            openModal={modal =>
              this.openModal(modal, {
                width: "45%",
                height: "75%"
              })
            }
            setModal={modalVisible => this.setModal(modalVisible)}
          />
          <Components.HomePagePanel
            openModal={modal =>
              this.openModal(modal, {
                width: "45%",
                height: "75%"
              })
            }
          />
          <Components.HomeArticles />
          <Components.Footer />
        </Components.Loader>
      </div>
    );
  }
}

export default connect()(Home);
