import React, { Component } from "react";
import Card from "../components/card";

class Features extends Component {
  render() {
    return (
      <div className={"features"}>
        <table>
          <tbody>
            <tr>
              <td>
                <Card
                  img={require("../img/about.png")}
                  cb={() => console.log("pressed")}
                >
                  <h1>About</h1>
                </Card>
              </td>
              <td>
                <Card
                  img={require("../img/logo.png")}
                  cb={() => console.log("pressed")}
                >
                  <h1>News</h1>
                </Card>
              </td>
              <td>
                <Card
                  img={require("../img/logo.png")}
                  cb={() => this.props.modalControl()}
                >
                  <h1>Statistics</h1>
                </Card>
              </td>
            </tr>
            <tr>
              <td>
                <Card
                  img={require("../img/logo.png")}
                  cb={() => console.log("pressed")}
                >
                  <h1>Contact Us</h1>
                </Card>
              </td>
              <td>
                <Card
                  img={require("../img/logo.png")}
                  cb={() => console.log("pressed")}
                >
                  <h1>Business Inquiry</h1>
                </Card>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Features;
