import React from "react";
import Style from "./style";
import { Footer, Text, FontAwesomeIcon } from "arclight-react";

export default class _ extends React.Component {

    builder(ico, cb) {
        return (
            <td style={{padding: "30px", cursor: "pointer"}} onClick={() => cb()}>
                <FontAwesomeIcon
                    size={"48px"}
                    theme={this.props.STATE.THEME}
                    icon={ico}
                />
            </td>
        )
    }

    iconList() {
        return (
            <Style.IconList>
                <table>
                    <tbody>
                        <tr>
                            {this.builder("twitch", () => window.open("https://www.twitch.tv/titanesportz"))}
                            {this.builder("discord", () => window.open("https://discord.gg/uZ8Q7ncrV4"))}
                            {this.builder("reddit", () => window.open("https://www.reddit.com/user/TES_League/"))}
                            {this.builder("youtube", () => window.open("https://www.youtube.com/channel/UCo5klVtSLp2YLch8ye_FBRw"))}
                            {this.builder("twitter", () => window.open("https://twitter.com/titanesportz"))}
                            {this.builder("facebook", () => window.open("https://www.facebook.com/titanesportz/"))}
                        </tr>
                    </tbody>
                </table>
            </Style.IconList>
        )
    }

    render() {
        const height = "150px";
        return (
            <Style.Base height={height} >
                <Footer 
                    name={"Thin"} 
                    height={height} 
                    left={<Style.BrandImg height={height}><img src={this.props.STATE.ENDPOINT + '/' + "static/assets/logo.png"} /></Style.BrandImg>} 
                    right={this.iconList()} 
                />  
            </Style.Base>
        )
    }
}