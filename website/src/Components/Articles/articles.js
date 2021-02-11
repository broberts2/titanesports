import React from "react";
import Style from "./style";
import Components from "../components";
import { Text, Img, Theme, Button, FontAwesomeIcon, Transition } from "arclight-react";

export default class _ extends React.Component {

    state = {
        Pinned: true,
        General: true,
        ["Titan Esports News"]: true,
        ["League of Legends News"]: true,
        ["Power Rankings"]: true
    }

    filter(articles) {
        return articles.filter(el => {
            if(
                (this.state.Pinned && el.tags.includes("pinned")) ||
                (this.state.General && el.tags.includes("general")) || 
                (this.state["Titan Esports News"] && el.tags.includes("tes_news")) || 
                (this.state["League of Legends News"] && el.tags.includes("lol_news")) || 
                (this.state["Power Rankings"] && el.tags.includes("power_rankings"))
            ) {
                return true;
            } else {
                return false;
            }
        });
    }

    articlePreviewTd(data, mini, i) {
        return (
            <td style={{padding: "25px"}}>
                <Transition trans={{animation: mini ? "fadeInLeft" : "zoomIn", delay: i ? i/5 : 0}} >
                    <Style.ArticlePreview mini={mini} borderColor={Theme[Theme[this.props.STATE.THEME].complement].backgroundColor} >
                        <Components.ArticlePreview mini={mini} data={data} STATE={this.props.STATE}/>
                    </Style.ArticlePreview>
                </Transition>
            </td>
        )
    }

    articlesPreview() {
        const articles = this.state.articles;
        let featuredArticles = [];
        for(let i = 0; i < 3 && i < articles.length; i++) {
            if(articles[i].published) featuredArticles.push(this.articlePreviewTd(articles[i]));
        }
        if(featuredArticles.length < 3) {
            for(let i = featuredArticles.length; i < 3; i++) {
                featuredArticles.push(<td />);
            }
        }
        return (
            <table>
                <tbody>
                    <tr>
                        {featuredArticles}
                    </tr>
                </tbody>
            </table>
        )
    }

    articleFeed() {
        const articles = this.filter(this.state.articles);
        let row = [], rows = [];
        const itemsPerRow = 5;
        for(let i = 0; i < articles.length; i++) {
            if(i % itemsPerRow === 0 && i > 0) {
                rows.push(<tr>{row}</tr>);
                row = [];
            }
            if(articles[i].published || articles[i].authorid === this.props.STATE.MY_ID || this.state.canEditOrPublish) {
                row.push(this.articlePreviewTd(articles[i], true, i));
            }
        }
        if(row.length > 0) {
            for(let i = row.length; i < itemsPerRow; i++) {
                row.push(<td />);
            }
            rows.push(row);
        }
        return (
            <table>
                <tbody>
                    {rows.length > 0 ? rows : <tr><td><div style={{width: "25vw"}}><Components.NoPoro align={"left"} trans={{animation: "fadeInLeft"}} text={"No results"} STATE={this.props.STATE} /></div></td></tr>}
                </tbody>
            </table>
        )
    }

    articleFeedControls() {
        const parser = str => {
            switch(str) {
                case "General":
                    return { txt: "General", ico: "cocktail" };
                case "Titan Esports News":
                    return { txt: "TitanEsports News", ico: "comments" };
                case "League of Legends News":
                    return { txt: "League of Legends News", ico: "circleNotch" };
                case "Power Rankings":
                    return { txt: "Power Rankings", ico: "burn" };
                default:
                    return { txt: "Pinned", ico: "star" };
            }
        }
        const bttn = (icon, cb) => (
            <td>
                <Style.ArticleFeedControlsButton active={this.state[icon]}>
                    <Button
                        theme={Theme[this.props.STATE.THEME].complement}
                        pop
                        onClick={() => {
                            const state = this.state;
                            state[icon] = !this.state[icon];
                            this.setState(state);
                            cb();
                        }}
                    >
                        <FontAwesomeIcon
                            theme={Theme[this.props.STATE.THEME].complement}
                            icon={parser(icon).ico}
                        />
                        {parser(icon).txt}
                    </Button>
                </Style.ArticleFeedControlsButton>
            </td>
        )
        return (
            <table>
                <tbody>
                    <tr>
                        {bttn("Pinned", () => this.setState({pinned: !this.state.Pinned}))}
                        {bttn("General", () => this.setState({pinned: !this.state.General}))}
                        {bttn("Titan Esports News", () => this.setState({pinned: !this.state["Titan Esports News"]}))}
                        {bttn("League of Legends News", () => this.setState({pinned: !this.state["League of Legends News"]}))}
                        {bttn("Power Rankings", () => this.setState({pinned: !this.state["Power Rankings"]}))}
                    </tr>
                </tbody>
            </table>
        )
    }

    async componentDidMount() {
        const canCreateArticles = await this.props.STATE.GLOBAL_METHODS.checkAccess("createArticles");
        const canEditArticles = await this.props.STATE.GLOBAL_METHODS.checkAccess("editArticles");
        const canPublishArticles = await this.props.STATE.GLOBAL_METHODS.checkAccess("publishArticles");
        const articles = await this.props.STATE.GLOBAL_METHODS.getArticles();
        this.setState({ articles, canCreateArticles, canEditOrPublish: canEditArticles || canPublishArticles });
    }

    render() {
        return (
            <Style.Base>
                <Style.PageTitle>
                    <Text trans={{animation: this.props.STATE.pageFading ? "fadeOutLeft" : "fadeInLeft"}} theme={this.props.STATE.THEME}>
                        Community Articles
                    </Text>
                </Style.PageTitle>
                <Style.Banner>
                    <Img trans={{animation: this.props.STATE.pageFading ? "zoomOut" : "zoomIn"}} src={this.props.STATE.ENDPOINT + '/' + "static/assets/bard_char.png"} />
                </Style.Banner>
                {this.state.canCreateArticles ? (
                    <Style.Create>
                        <Button
                            theme={Theme[this.props.STATE.THEME].complement}
                            pop
                            onClick={() => this.props.STATE.GLOBAL_METHODS.setURL("/article")}
                        >
                            <div style={{width: "500px"}}>Write an Article!</div>
                        </Button>
                    </Style.Create>
                ) : null}
                <Style.Content>
                    <Style.FeaturedArticlesTitle>
                        <Text theme={this.props.STATE.THEME}>Newest Articles</Text>
                    </Style.FeaturedArticlesTitle>
                    {this.state.articles ? (
                        <React.Fragment>
                            <Style.FeaturedArticles>
                                {this.articlesPreview()}
                            </Style.FeaturedArticles>
                            <Style.ArticleFeedControls>
                                {this.articleFeedControls()}
                            </Style.ArticleFeedControls>
                            <Style.ArticleFeed>
                                {this.articleFeed()}
                            </Style.ArticleFeed>
                        </React.Fragment>
                    ) : null}
                </Style.Content>
            </Style.Base>
        )
    }
}