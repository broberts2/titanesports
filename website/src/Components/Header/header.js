import React from "react";
import Style from "./style";
import { Header, FontAwesomeIcon, Transition, Button, Text, Theme } from "arclight-react";
import { Utils } from "arclight-react";

export default class Home extends React.Component {render() {
        return (
            <Style.Base props={{}}>
                <Style.Header props={{}}>
                    <Header
                        name={"StylishCenter"}
                        textDisplay={{
                        left: (
                            <Transition trans={{ animation: "fadeInLeft", delay: 2 }}>
                            <img src={this.props.STATE.ENDPOINT + '/' + this.props.STATE.SEASON_LOGO} height={"45px"} />
                            </Transition>
                        ),
                        center: null,
                        right: this.props.STATE.DISPLAY_NAME ? 
                            (
                                <Transition trans={{ animation: "fadeInRight", delay: 2 }}>
                                    <h1>
                                        <b>
                                            <i><Text theme={this.props.STATE.THEME}>{this.props.STATE.DISPLAY_NAME}</Text></i>
                                        </b>
                                    </h1>
                                </Transition>
                            )
                        : null
                        }}
                        theme={this.props.STATE.THEME}
                        info={{
                        width: "100%",
                        height: "200px",
                        crown: (
                            <Transition trans={{ animation: "fadeIn", delay: 1.25 }}>
                            <div
                                style={{
                                position: "relative",
                                width: "125px",
                                height: "150px",
                                cursor: "pointer"
                                }}
                            >
                                <img
                                    onClick={() => this.props.STATE.GLOBAL_METHODS.setURL("/")}
                                    src={this.props.STATE.ENDPOINT + '/' + this.props.STATE.LOGO}
                                    style={{
                                        height: "150px",
                                    }}
                                />
                            </div>
                            </Transition>
                        ),
                        }}
                        controls={[
                        this.props.STATE.ACCESS.editSite ? <Button
                            trans={{ animation: "fadeInRight", delay: 0.75 }}
                            theme={Theme[this.props.STATE.THEME].complement}
                            pop
                            onClick={() => this.props.STATE.GLOBAL_METHODS.setURL("/settings")}
                        >
                            Settings
                        </Button> : <div/>,
                        <Button
                            trans={{ animation: "fadeInRight", delay: 0.75 }}
                            theme={Theme[this.props.STATE.THEME].complement}
                            pop
                            onClick={() => window.open("https://www.twitch.tv/titanesportz")}
                        >
                            <FontAwesomeIcon theme={Theme[this.props.STATE.THEME].complement} icon={"twitch"} />
                        </Button>,
                        this.props.STATE.DISPLAY_NAME ? <Button
                            trans={{ animation: "fadeInRight", delay: 0.75 }}
                            theme={Theme[this.props.STATE.THEME].complement}
                            pop
                            onClick={async () => {
                                const user = await this.props.STATE.GLOBAL_METHODS.identify();
                                this.props.STATE.GLOBAL_METHODS.setURL(`/account?user=${user.discordId}`)
                            }}
                        >
                            MyAccount
                        </Button> : <div/>,
                        <Button
                            trans={{ animation: "fadeInRight", delay: 0.5 }}
                            theme={Theme[this.props.STATE.THEME].complement}
                            pop
                            onClick={() => window.open("https://discord.gg/uZ8Q7ncrV4")}
                        >
                            <FontAwesomeIcon theme={Theme[this.props.STATE.THEME].complement} icon={"discord"} />
                        </Button>,
                        <Button
                            trans={{ animation: "fadeInRight", delay: 0.75 }}
                            theme={Theme[this.props.STATE.THEME].complement}
                            pop
                            onClick={() => this.props.STATE.GLOBAL_METHODS.setURL("/staff")}
                        >
                            Staff
                        </Button>,
                        <Button
                            trans={{ animation: "fadeInRight", delay: 0.5 }}
                            theme={Theme[this.props.STATE.THEME].complement}
                            pop
                            onClick={() => window.open("https://www.reddit.com/user/TES_League/")}
                        >
                            <FontAwesomeIcon theme={Theme[this.props.STATE.THEME].complement} icon={"reddit"} />
                        </Button>,
                        <Button
                            trans={{ animation: "fadeInRight", delay: 0.75 }}
                            theme={Theme[this.props.STATE.THEME].complement}
                            pop
                            onClick={() => this.props.STATE.GLOBAL_METHODS.setURL("/articles")}
                        >
                            Articles
                        </Button>,
                        <Button
                            trans={{ animation: "fadeInRight", delay: 0.5 }}
                            theme={Theme[this.props.STATE.THEME].complement}
                            pop
                            onClick={() => window.open("https://www.youtube.com/channel/UCo5klVtSLp2YLch8ye_FBRw")}
                        >
                            <FontAwesomeIcon theme={Theme[this.props.STATE.THEME].complement} icon={"youtube"} />
                        </Button>,
                        <Button
                            trans={{ animation: "fadeInRight", delay: 0.75 }}
                            theme={Theme[this.props.STATE.THEME].complement}
                            pop
                            onClick={() => window.open("https://www.twitch.tv/titanesportz")}
                            >
                                Statistics
                        </Button>,
                        <Button
                            trans={{ animation: "fadeInRight", delay: 0.5 }}
                            theme={Theme[this.props.STATE.THEME].complement}
                            pop
                            onClick={() => window.open("https://twitter.com/titanesportz")}
                        >
                            <FontAwesomeIcon theme={Theme[this.props.STATE.THEME].complement} icon={"twitter"} />
                        </Button>,
                        <Button
                            trans={{ animation: "fadeInRight", delay: 0.75 }}
                            theme={Theme[this.props.STATE.THEME].complement}
                            pop
                            onClick={() => window.open("https://www.twitch.tv/titanesportz")}
                        >
                            Titan Draft
                        </Button>,
                        <Button
                            trans={{ animation: "fadeInRight", delay: 0.5 }}
                            theme={Theme[this.props.STATE.THEME].complement}
                            pop
                            onClick={() => window.open("https://www.facebook.com/titanesportz/")}
                        >
                            <FontAwesomeIcon
                            theme={Theme[this.props.STATE.THEME].complement}
                            icon={"facebook"}
                            />
                        </Button>,
                        <Button
                            trans={{ animation: "fadeInRight", delay: 0.5 }}
                            theme={Theme[this.props.STATE.THEME].complement}
                            pop
                            onClick={() => this.props.STATE.GLOBAL_METHODS.setURL("/")}
                        >
                            Home
                        </Button>
                        ]}
                    />
                </Style.Header>   
            </Style.Base>
        )
    }
}