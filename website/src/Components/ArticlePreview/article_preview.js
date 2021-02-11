import React from "react";
import Style from "./style";
import { Text, FontAwesomeIcon, Theme } from "arclight-react";

export default class _ extends React.Component {
    render() {
        const parser = str => {
            switch(str) {
                case "general":
                    return "cocktail";
                case "tes_news":
                    return "comments";
                case "lol_news":
                    return "circleNotch";
                case "power_rankings":
                    return "burn";
                default:
                    return "star";
            }
        }
        return (
            <Style.Base onClick={() => this.props.STATE.GLOBAL_METHODS.setURL(`/article?id=${this.props.data._id}`)} >
                <Style.FeedGridArticle isPublished={this.props.data.published} backgroundImg={this.props.data.tileimgurl}>
                    <Style.FeedGridArticleCrownImg>
                        <img src={this.props.data.iconImgUrl} />
                    </Style.FeedGridArticleCrownImg>
                    <Style.FeedGridArticleTitle backgroundColor={Theme[this.props.STATE.THEME].backgroundColor} mini={this.props.mini}>
                        <Text theme={this.props.STATE.THEME}>{this.props.data.title}</Text>
                    </Style.FeedGridArticleTitle>
                    <Style.FeedGridArticleCreated backgroundColor={Theme[this.props.STATE.THEME].backgroundColor} mini={this.props.mini}>
                        <Text theme={this.props.STATE.THEME}>{this.props.data.createddate}</Text>
                    </Style.FeedGridArticleCreated>
                    <Style.Tags mini={this.props.mini}>
                        {this.props.data.tags.map(el => (
                            <Style.TagsItem mini={this.props.mini} backgroundColor={Theme[this.props.STATE.THEME].backgroundColor} >
                                <div style={{width: "100%", textAlign: "center"}}>
                                    <FontAwesomeIcon
                                        color={Theme[this.props.STATE.THEME].fontColor}
                                        size={this.props.mini ? "1vw" : "1.25vw"}
                                        theme={this.props.STATE.THEME}
                                        icon={parser(el)}
                                    />
                                </div>
                            </Style.TagsItem>
                        ))}
                    </Style.Tags>
                    <Style.FeedGridArticleAuthor backgroundColor={Theme[this.props.STATE.THEME].backgroundColor} mini={this.props.mini}>
                        <Text theme={this.props.STATE.THEME}>{this.props.data.author}</Text>
                    </Style.FeedGridArticleAuthor>
                </Style.FeedGridArticle>
            </Style.Base>
        )
    }
}