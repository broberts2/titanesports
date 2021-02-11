import React from "react";
import Style from "./style";
import { Img, Theme, Transition, Text, Button, FontAwesomeIcon } from "arclight-react";

export default class _ extends React.Component {

    spawnBadges(badges) {
        let row =[];
        let rows = []
        let n = 7;
        badges.map((el, i) => {
            if (i % n === 0 && i > 0) {
                rows.push(<tr>{row}</tr>);
                row = [];
            }
            row.push(<td align={"center"} style={{padding: "1vw"}}>{el}</td>);
        })
        if(row.length > 0) {
            for(let i = row.length; i < n; i++) {
                row.push(<td />);
            }
            rows.push(row);
        }
        return <table><tbody>{rows}</tbody></table>;
    }

    async componentDidMount() {
        const params = {};
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
          params[key] = value;
        });
        const user = await this.props.STATE.GLOBAL_METHODS.getUser(params.user);
        const badges = await this.props.STATE.GLOBAL_METHODS.getBadgeBatch("7vw", user.badges)
        const names = user.nickname.split('|');
        this.setState({badges: badges.map(el => el.component), avatarUrl: user.avatarUrl, nickname: names[0].trim(), subname: names[1] ? names[1].trim() : null })

    }

    render() {
        return (
            <Style.Base backgroundColor={Theme[this.props.STATE.THEME].backgroundColor}>
                {this.state ? (
                    <React.Fragment>
                        <Style.Banner lineColor={Theme[Theme[this.props.STATE.THEME].complement].backgroundColor}>
                            <Style.BannerBGImg>
                                <Img trans={{animation: this.props.STATE.pageFading ? "fadeOut" : "fadeIn"}} src={this.props.STATE.ENDPOINT + '/' + "static/profile_banners/skt_azir.png"} />
                            </Style.BannerBGImg>
                            <Style.SignOutButton>
                                <Button
                                    theme={Theme[this.props.STATE.THEME].complement}
                                    pop
                                    onClick={() => this.props.STATE.GLOBAL_METHODS.signOut()}
                                >
                                    <div style={{width: "200px"}}>Sign Out</div>
                                </Button>
                            </Style.SignOutButton>
                            <Transition trans={{animation: this.props.STATE.pageFading ? "fadeOutLeft" : "fadeInLeft"}} >
                                <Style.BannerProfileImg lineColor={Theme[Theme[this.props.STATE.THEME].complement].backgroundColor}>
                                    <Img src={this.state.avatarUrl} />
                                </Style.BannerProfileImg>
                            </Transition>
                        </Style.Banner>
                        <Style.Title>
                            <Style.TitlePrimary>
                                <Text trans={{animation: this.props.STATE.pageFading ? "fadeOutRight" : "fadeInRight"}} theme={this.props.STATE.THEME}>{this.state.nickname}</Text>
                            </Style.TitlePrimary>
                            <Style.TitleSecondary>
                                <Text trans={{animation: this.props.STATE.pageFading ? "fadeOutRight" : "fadeInRight", delay: 0.2}} theme={this.props.STATE.THEME}>{this.state.subname}</Text>
                            </Style.TitleSecondary>
                        </Style.Title>
                        <Style.ProfileCrown>
                            <Img trans={{animation: this.props.STATE.pageFading ? "zoomOut" : "zoomIn"}} src={this.props.STATE.ENDPOINT + '/' + "static/assets/profile_crown_azir.png"} />
                        </Style.ProfileCrown>
                        <Style.PageContent>
                            <Style.SectionHeader>
                                <Text theme={this.props.STATE.THEME}>Badges and Accolades</Text>
                            </Style.SectionHeader>
                            <Style.SubSectionHeader>
                                <Text theme={this.props.STATE.THEME}>Season 7</Text>
                            </Style.SubSectionHeader>
                            {this.state.badges ? <Style.Badges>{this.spawnBadges(this.state.badges)}</Style.Badges> : null}
                        </Style.PageContent>
                    </React.Fragment>
                ) : null}
            </Style.Base>
        )
    }
}