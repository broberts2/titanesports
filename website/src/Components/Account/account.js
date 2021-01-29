import React from "react";
import Style from "./style";
import { Img, Theme, Transition, Text } from "arclight-react";

export default class _ extends React.Component {

    state ={}

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
        const badges = await this.props.STATE.GLOBAL_METHODS.getBadgeBatch("7vw", ["6013e3cdba3fd546b08d8097", "6014882ca61104381004d686"])
        this.setState({badges: badges.map(el => el.component)})

    }

    render() {
        return (
            <Style.Base props={{}}>
                <Style.Banner lineColor={Theme[Theme[this.props.STATE.THEME].complement].backgroundColor}>
                    <Style.BannerBGImg>
                        <Img trans={{animation: this.props.STATE.pageFading ? "fadeOut" : "fadeIn"}} src={this.props.STATE.ENDPOINT + '/' + "static/profile_banners/skt_azir.png"} />
                    </Style.BannerBGImg>
                    <Transition trans={{animation: this.props.STATE.pageFading ? "fadeOutLeft" : "fadeInLeft"}} >
                        <Style.BannerProfileImg lineColor={Theme[Theme[this.props.STATE.THEME].complement].backgroundColor}>
                            <Img src={this.props.STATE.ENDPOINT + '/' + "static/profile_imgs/Azir_3.jpg"} />
                        </Style.BannerProfileImg>
                    </Transition>
                </Style.Banner>
                <Style.Title>
                    <Style.TitlePrimary>
                        <Text trans={{animation: this.props.STATE.pageFading ? "fadeOutRight" : "fadeInRight"}} theme={this.props.STATE.THEME}>Jetgorilla</Text>
                    </Style.TitlePrimary>
                    <Style.TitleSecondary>
                        <Text trans={{animation: this.props.STATE.pageFading ? "fadeOutRight" : "fadeInRight", delay: 0.2}} theme={this.props.STATE.THEME}>The Bot Guy</Text>
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
                <Style.__temp__>
                    
                </Style.__temp__>
            </Style.Base>
        )
    }
}