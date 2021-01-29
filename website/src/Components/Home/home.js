import React from "react";
import Style from "./style";
import Components from "../components";
import { MediaCycler, Button, FontAwesomeIcon, TechDivider, Text, VideoHover, Transition, Theme, Img} from "arclight-react";

export default class Home extends React.Component {

    state = {
        panelHoverId: 0,
        articleHoverId: 0
    }

    article(backgroundImg, crown, id) {
        return (
            <td style={{padding: "20px"}} onMouseEnter={() => this.setState({articleHoverId: id})}>
                <Style.FeedGridArticle stateId={this.state.articleHoverId} id={id} backgroundImg={this.props.STATE.ENDPOINT + '/' + backgroundImg}>
                    <Style.FeedGridArticleCrownImg>
                        <img src={this.props.STATE.ENDPOINT + '/' + crown} />
                    </Style.FeedGridArticleCrownImg>
                    <Style.FeedGridArticleTitle>
                        <Text theme={"Dark"}>Article Title</Text>
                    </Style.FeedGridArticleTitle>
                    <Style.FeedGridArticleCreated>
                        <Text theme={"Dark"}>01/23/2021</Text>
                    </Style.FeedGridArticleCreated>
                    <Style.FeedGridArticleAuthor>
                        <Text theme={"Dark"}>Article Author</Text>
                    </Style.FeedGridArticleAuthor>
                </Style.FeedGridArticle>
            </td>
        )
    }

    panelItem(title, height, marginTop, iconSrc, id, vid, cb) {
        return (
            <Style.PanelItem marginTop={marginTop} onMouseOver={() => this.setState({panelHoverId: id})} onMouseLeave={() => this.setState({panelHoverId: 0})} onClick={() => cb()}>
                <Style.PanelContent height={height}>
                    <div style={{position: "absolute", height: "100%"}}>
                        <div style={{ height: "25vw", opacity: this.state.panelHoverId > 0 ? (this.state.panelHoverId === id ? 1 : 0.5) : 1, transition: "all 0.5s ease"}}>
                        <VideoHover
                            preserve
                            fadeOnPause={false}
                            playing={null}
                            src={this.props.STATE.ENDPOINT + '/' + vid}
                        /></div>
                    </div>
                    <Style.PanelTitle>
                        <Transition inheritDimensions trans={{ duration: 0.5, animation: this.state.panelHoverId === id ? "fadeInDown" : "fadeOutUp" }}>
                            <Style.PanelTitleText>
                                <Text theme={"Dark"}>
                                    {title}
                                </Text>
                            </Style.PanelTitleText>
                        </Transition>
                    </Style.PanelTitle>
                </Style.PanelContent>
                <Style.PanelItemIcon marginTop={marginTop}>
                    <Img src={iconSrc} trans={{animation: this.state.panelHoverId === id ? "fadeInUp" : "fadeOutDown"}} />
                </Style.PanelItemIcon>
            </Style.PanelItem>
        )
    }

    panelList() {
        let hoverNumber = 0;
        const padding = "10px";
        return (
            <React.Fragment>
                <td style={{padding}}>
                    {this.panelItem("About Us", "70%", "40%", this.props.STATE.ENDPOINT + '/' + "static/assets/about_us.png", ++hoverNumber, this.props.STATE.HOME_PAGE_PANEL_ABOUT_US, () => console.log("hello world"))}
                 </td>
                <td style={{padding}}>
                    {this.panelItem("Statistics", "85%", "20%", this.props.STATE.ENDPOINT + '/' + "static/assets/statistics.png", ++hoverNumber, this.props.STATE.HOME_PAGE_PANEL_STATISTICS, () => console.log("hello world"))}
                </td>
                <td style={{padding}}>
                    {this.panelItem("TitanDraft", "100%", "0%", this.props.STATE.ENDPOINT + '/' + "static/assets/draft.png", ++hoverNumber, this.props.STATE.HOME_PAGE_PANEL_TITAN_DRAFT, () => console.log("hello world"))}
                 </td>
                <td style={{padding}}>
                    {this.panelItem("Community Articles", "85%", "20%", this.props.STATE.ENDPOINT + '/' + "static/assets/article.png", ++hoverNumber, this.props.STATE.HOME_PAGE_PANEL_COMMUNITY_ARTICLES, () => console.log("hello world"))}
                </td>
                <td style={{padding}}>
                    {this.panelItem("TES Staff", "70%", "40%", this.props.STATE.ENDPOINT + '/' + "static/assets/staff.png", ++hoverNumber, this.props.STATE.HOME_PAGE_PANEL_ROSTER_STAFF, () => this.props.STATE.GLOBAL_METHODS.setURL("/staff"))}
                </td>
            </React.Fragment>
        )
    }

    articleList() {
        let articleNumber = 0;
        return (
            <table onMouseLeave={() => this.setState({articleHoverId: 0})}>
                <tbody>
                    <tr>
                        {this.article("static/assets/zilean_1.jpg", "static/assets/article_crown.png", ++articleNumber)}
                        {this.article("static/assets/zilean_2.jpg", "static/assets/article_crown.png", ++articleNumber)}
                        {this.article("static/assets/zilean.jpg", "static/assets/article_crown.png", ++articleNumber)}
                    </tr>
                    <tr>
                        {this.article("static/assets/zilean_2.jpg", "static/assets/article_crown.png", ++articleNumber)}
                        {this.article("static/assets/zilean_2.jpg", "static/assets/article_crown.png", ++articleNumber)}
                        {this.article("static/assets/zilean_2.jpg", "static/assets/article_crown.png", ++articleNumber)}
                    </tr>
                </tbody>
            </table>
        )
    }

    render() {
        return (
            <Style.Base props={{}}>
                <Style.Banner>
                    <MediaCycler
                        trans={{ animation: this.props.STATE.pageFading ? "fadeOut" : "fadeIn" }}
                        preserve
                        randomize={true}
                        type={"video"}
                        elements={this.props.STATE.HOME_VIDEOS.map(el => this.props.STATE.ENDPOINT + '/' + el)}
                        interval={20}
                        elementTransition={{
                            transIn: { animation: "fadeIn", duration: 3 },
                            transOut: { animation: "fadeOut", duration: 3 },
                        }}
                    />
                    {
                        !this.props.STATE.DISPLAY_NAME ? (
                            <Style.Button>
                                <Button
                                    trans={{ animation: "fadeIn" }}
                                    theme={Theme[this.props.STATE.THEME].complement}
                                    pop
                                    onClick={() => this.props.STATE.GLOBAL_METHODS.showModal("SignIn")}
                                >
                                    <div style={{width: "125px", fontSize: "24px"}}>Sign In</div>
                                </Button>
                            </Style.Button>
                        ) : null
                    }
                    <Style.Divider>
                        <Transition trans={{ animation: this.props.STATE.pageFading ? "zoomOut" : "zoomIn" }}>
                            <TechDivider filter={"invert(40%) sepia(100%) saturate(1000%) hue-rotate(238deg) brightness(35%) contrast(104%)"} />
                            {this.props.STATE.HOME_PAGE_DIVIDER_IMAGE ? (
                                <Style.OverlayImg>
                                    <img src={this.props.STATE.ENDPOINT + '/' + this.props.STATE.HOME_PAGE_DIVIDER_IMAGE} />
                                </Style.OverlayImg>
                            )
                            : null}
                        </Transition>
                    </Style.Divider>
                </Style.Banner>
                <Style.InfoBlock>
                    <Text trans={{ animation: this.props.STATE.pageFading ? "fadeOut" : "fadeIn" }} theme={this.props.STATE.THEME}>
                        <p>
                            Titan eSports Is An Amateur eSports Organization That Brings Competitive League of Legends Gameplay To All Skill Levels
                        </p>
                    </Text>
                </Style.InfoBlock>
                <Style.Grid>
                    <Transition inheritDimensions trans={{animation: this.props.STATE.pageFading ? "fadeOut" : "fadeIn"}}>
                        <table>
                            <tbody>
                                <tr>{this.panelList()}</tr>
                            </tbody>
                        </table>
                    </Transition>
                </Style.Grid>
                <Style.FeedBanner STATE={this.props.STATE}>
                <Transition inheritDimensions trans={{ animation: this.props.STATE.pageFading ? "fadeOut" : "fadeIn" }}>
                    <Style.FeedDivider>
                        <Style.FeedDividerText>
                            <Text theme={Theme[this.props.STATE.THEME].complement}>
                                Spring Split Coming Soon!
                            </Text>
                        </Style.FeedDividerText>
                    </Style.FeedDivider>
                    <Style.FeedBannerImg>
                        <img src={this.props.STATE.ENDPOINT + '/' + "static/assets/azir_char.png"} />
                    </Style.FeedBannerImg>
                    </Transition>
                </Style.FeedBanner>
                <Style.FeedGrid>
                    <Transition inheritDimensions trans={{ animation: this.props.STATE.pageFading ? "zoomOut" : "zoomIn" }}>
                        {this.articleList()}
                    </Transition>
                </Style.FeedGrid>
            </Style.Base>
        )
    }
}