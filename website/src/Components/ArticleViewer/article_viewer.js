import React from "react";
import Style from "./style";
import { DiamondDivider, Img, Text, Theme, TextField, Button, TextArea, FontAwesomeIcon } from "arclight-react";
const moment = require("moment");

export default class _ extends React.Component {

    newBlockButton() {
        return (
            <Style.NewBlock>
                <div style={{display: "inline-flex"}}>
                    <Button
                        trans={{ animation: "fadeInRight", delay: 0.75 }}
                        theme={Theme[this.props.STATE.THEME].complement}
                        pop
                        onClick={() => this.createBlock("", "")}
                    >
                        Create Content Block
                    </Button>
                </div>
            </Style.NewBlock>
        );
    }

    dropBlock(n) {
        const blocks = this.state.blocks;
        delete blocks[n];
        this.setState({ blocks });
    }

    createBlock(content, title, n = 0) {
        if (this.state.blocks[n]) {
            this.createBlock(content, title, ++n);
        } else {
            const blocks = this.state.blocks;
            blocks[n] = { n, content, title };
            this.setState({ blocks });
        }
    }

    htmlParser(text) {
        if(text) {
            const elements = ["div", "table", "ul", "ol"];
            elements.map(el => {
                const match = text.match(new RegExp(`(<${el}[^>]*>(?:.|\n)*?<\/${el}>)`, 'g'));
                if(match) match.map(_ => text = text.replace(_, _.replace(/\n/g,"")))
            });
            text = text.replace(/\n/g, "<br>");
        }
        return text;
    }

    renderBlock(n, content, title) {
        const _ = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
        if(content) content = content ? content.replace(content.match(_), "") : null;
        if(title) title = title ? title.replace(title.match(_), "") : null;
        return (
            <Style.Block>
                {(title && title.length > 0) || this.state.editing ? (
                    <Style.BlockTitle>
                        <Text theme={this.props.STATE.THEME}>{ this.state.editing ? (
                            <TextField
                                password={false}
                                variant={"filled"}
                                theme={this.props.STATE.THEME}
                                textSize={null}
                                readonly={false}
                                value={this.state.blocks[n].title}
                                placeholder={"Block Title"}
                                onChange={(e) => {
                                    const blocks = this.state.blocks;
                                    blocks[n].title = e.target.value;
                                    this.setState({ blocks });
                                }}
                            />
                        ) : <div dangerouslySetInnerHTML={{ __html: title }} /> }</Text>
                    </Style.BlockTitle>
                ) : null}
                <Style.BlockContent editing={this.state.editing} >
                    <Text theme={this.props.STATE.THEME}>{ this.state.editing ? (
                        <TextArea
                            readonly={false}
                            value={this.state.blocks[n].content}
                            height={"25vw"}
                            theme={this.props.STATE.THEME}
                            controls={[
                                { name: "Delete Content Block", operation: () => this.dropBlock(n) },
                                { name: "Create Content Block", operation: () => this.createBlock("", "") }
                            ]}
                            placeholder={"Block text here!"}
                            onChange={(e) => {
                                const blocks = this.state.blocks;
                                blocks[n].content = e.target.value;
                                this.setState({ blocks });
                            }}
                      />
                    ) : <div dangerouslySetInnerHTML={{ __html: this.htmlParser(content) }} /> }</Text>
                </Style.BlockContent>
            </Style.Block>
        );
    }

    defState(editing, canEditDocument, canPublishDocument, canCreateDocument) {
        return ({
            iconImgUrl: `${this.props.STATE.ENDPOINT}/static/assets/profile_crown_azir.png`,
            editing: editing ? editing : false,
            canEditDocument: canEditDocument ? canEditDocument : false,
            canPublishDocument: canPublishDocument ? canPublishDocument : false,
            canCreateDocument: canCreateDocument ? canCreateDocument : false,
            title: "",
            blocks: {},
            tags: [],
            bannerUrl: `${this.props.STATE.ENDPOINT}/static/assets/new_article.jpg`
        });
    }

    async getArticle(editing) {
        const params = {};
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
          params[key] = value;
        });
        const article = await this.props.STATE.GLOBAL_METHODS.getArticleById(params.id).then(el => el ? el[0] : null);
        const canEdit = await this.props.STATE.GLOBAL_METHODS.checkAccess("editArticles");
        const canCreateDocument = await this.props.STATE.GLOBAL_METHODS.checkAccess("editArticles");
        const canPublishDocument = await this.props.STATE.GLOBAL_METHODS.checkAccess("publishArticles");
        const canEditDocument = (this.props.STATE.MY_ID && article && this.props.STATE.MY_ID === article.authorid) || canEdit;
        if (article) {
            const authorName = await this.props.STATE.GLOBAL_METHODS.getUser(article.authorid).then(res => res.nickname);
            this.setState({
                authorName,
                publisheddate: article.modifieddate,
                iconImgUrl: article.iconImgUrl,
                tags: article.tags,
                canCreateDocument,
                isPublished: article.published,
                canEditDocument,
                canPublishDocument,
                id: article ? params.id : null,
                editing: editing ? editing : false,
                title: article.title,
                blocks: article.contentblocks,
                bannerUrl: article.bannerimgurl
            });
        } else {
            const authorName = await this.props.STATE.GLOBAL_METHODS.getUser(this.props.STATE.MY_ID).then(res => res.nickname);
            this.props.STATE.GLOBAL_METHODS.setURL("/article");
            this.setState(Object.assign(this.defState(false, canEditDocument, canPublishDocument, canCreateDocument), { authorName, publisheddate: new Date() }));
        }
    }

    async updateArticle() {
        const res = await this.props.STATE.GLOBAL_METHODS.updateArticle({
            iconImgUrl: this.state.iconImgUrl,
            tags: this.state.tags,
            id: this.state.id,
            title: this.state.title,
            subject: "My Test Article Subject",
            tileimgurl: this.state.bannerUrl,
            bannerimgurl: this.state.bannerUrl,
            contentblocks: this.state.blocks
        });
        if(res === "Success!") {
            alert("Document successfully updated!");
        } else {
            alert("Document failed to update.");
        }
    }

    async createArticle() {
        const res = await this.props.STATE.GLOBAL_METHODS.createArticle({
            iconImgUrl: this.state.iconImgUrl,
            authorid: this.props.STATE.MY_ID,
            tags: ["general", "pinned", "power_rankings"],
            title: this.state.title,
            subject: "My Test Article Subject",
            tileimgurl: this.state.bannerUrl,
            bannerimgurl: this.state.bannerUrl,
            contentblocks: this.state.blocks
        });
        if(res.msg === "Success!") {
            alert("Document successfully created!");
            return res.id;
        } else {
            alert("Document failed to create.");
        }
    }

    async publishArticle() {
        const res = await this.props.STATE.GLOBAL_METHODS.publishArticle({
            id: this.state.id,
            published: this.state.isPublished
        });
        if(res === "Success!") {
            alert(`Document ${this.state.isPublished ? "publish" : "unpublish"} successful!`);
        } else {
            alert("Document operation failed.");
        }
    }

    tags(arr) {
        const parser = str => {
            switch(str) {
                case "general":
                    return { txt: "General", ico: "cocktail" };
                case "tes_news":
                    return { txt: "TitanEsports News", ico: "comments" };
                case "lol_news":
                    return { txt: "League of Legends News", ico: "circleNotch" };
                case "power_rankings":
                    return { txt: "Power Rankings", ico: "burn" };
                default:
                    return { txt: "Pinned", ico: "star" };
            }
        }
        return arr.sort().map(icon => this.state.editing ? ( 
            <td style={{padding: "10px", opacity: this.state.tags.includes(icon) ? 1 : 0.25}}>
                <Button
                    trans={{ animation: "fadeInRight", delay: 0.5 }}
                    theme={Theme[this.props.STATE.THEME].complement}
                    pop
                    onClick={() => {
                        let tags = this.state.tags;
                        if(tags.includes(icon)) {
                            tags = tags.filter(el => el === icon ? null : el);
                        } else {
                            tags.push(icon);
                        }
                        this.setState({ tags });
                    }}
                >
                    <FontAwesomeIcon
                        theme={this.props.STATE.THEME}
                        icon={parser(icon).ico}
                    />
                    {parser(icon).txt}
                </Button>
            </td>
        ) : (
            <td style={{padding: "15px"}}>
                <FontAwesomeIcon
                    size={"4vw"}
                    theme={this.props.STATE.THEME}
                    icon={parser(icon).ico}
                />
            </td>
        ));
    }

    componentDidMount() {
        this.getArticle();
    }

    render() {
        return (
            <Style.Base>
                {this.state ? <React.Fragment>
                    <Style.Banner>
                        <Img src={this.state.bannerUrl} />
                    </Style.Banner>
                    <Style.Divider>
                        <DiamondDivider filter={Theme[this.props.STATE.THEME].backgroundFilter} />
                        <Style.IconImg>
                            {
                                this.state.editing ? (
                                    <Style.IconImgField>
                                        <TextField
                                            password={false}
                                            variant={"outlined"}
                                            theme={this.props.STATE.THEME}
                                            textSize={null}
                                            readonly={false}
                                            value={this.state.iconImgUrl}
                                            placeholder={"Icon URL"}
                                            onChange={(e) => this.setState({ iconImgUrl: e.target.value })}
                                        />
                                    </Style.IconImgField>
                                ) : null
                            }
                            <Img src={this.state.iconImgUrl} />
                        </Style.IconImg>
                        {
                            this.state.editing ? <Style.EditBanner>
                                <TextField
                                    password={false}
                                    variant={"outlined"}
                                    theme={this.props.STATE.THEME}
                                    textSize={null}
                                    readonly={false}
                                    value={this.state.bannerUrl}
                                    placeholder={"Banner URL"}
                                    onChange={(e) => this.setState({ bannerUrl: e.target.value })}
                                />
                            </Style.EditBanner> : null
                        }
                        { this.state.canEditDocument ? (
                            <Style.EditToggle>
                                <Button
                                    trans={{ animation: "fadeInRight", delay: 0.5 }}
                                    theme={Theme[this.props.STATE.THEME].complement}
                                    pop
                                    onClick={() => this.setState({ editing: !this.state.editing })}
                                >
                                    <div style={{ width: "250px" }}>{this.state.editing ? `Preview` : `Edit`}</div>
                                </Button>
                            </Style.EditToggle>
                        ) : null}
                        { this.state.canPublishDocument && this.state.editing ? (
                            <Style.PublishDocument>
                                <Button
                                    trans={{ animation: "fadeInRight", delay: 0.75 }}
                                    theme={Theme[this.props.STATE.THEME].complement}
                                    pop
                                    onClick={() => this.state.isPublished || window.confirm("Are you sure you want to publish this article? You must select 'Save Updates' at the bottom of this page to finalize all changes.") ? this.setState({ isPublished: !this.state.isPublished }) : null }
                                >
                                    <div style={{ width: "250px" }}>{this.state.isPublished ? `Unpublish` : `Publish`}</div>
                                </Button>
                            </Style.PublishDocument>
                        ) : null}
                        <Style.Tags>
                            <table><tbody><tr>{this.tags(this.state.editing ? ["pinned", "general", "tes_news", "lol_news", "power_rankings"] : this.state.tags)}</tr></tbody></table>
                        </Style.Tags>
                    </Style.Divider>
                    {(this.state.canEditDocument || this.state.canPublishDocument) && this.state.editing ? <Style.PublishDisplay isPublished={this.state.isPublished}>{this.state.isPublished ? `Published` : 'Unpublished'}</Style.PublishDisplay> : null}
                    <Style.Content theme={this.props.STATE.THEME}>
                        <Style.Title theme={this.props.STATE.THEME} len={this.state.title.length}>
                            <Text theme={this.props.STATE.THEME}>
                                {
                                    this.state.editing ? (
                                        <TextField
                                            password={false}
                                            variant={"outlined"}
                                            theme={this.props.STATE.THEME}
                                            textSize={`3vw`}
                                            readonly={false}
                                            value={this.state.title}
                                            placeholder={"Document Title"}
                                            onChange={(e) => this.setState({ title: e.target.value })}
                                        />
                                    ) : this.state.title
                                }
                            </Text>
                        </Style.Title>
                        {Object.entries(this.state.blocks).map(vals => this.renderBlock(vals[0], vals[1].content, vals[1].title))}
                        {Object.keys(this.state.blocks).length > 0 || !this.state.editing ? null : this.newBlockButton()}
                        {(this.state.canEditDocument || this.state.canPublishDocument) && this.state.editing ? (
                            <Style.ChangeControls isActive={this.state.title.length > 0 && Object.keys(this.state.blocks).length > 0}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Button
                                                    trans={{ animation: "fadeInRight", delay: 0.75 }}
                                                    theme={Theme[this.props.STATE.THEME].complement}
                                                    pop
                                                    onClick={
                                                        async () => {
                                                            const callback = this.state.id ? () => this.updateArticle() : () => this.createArticle();
                                                            if(window.confirm(this.state.id ? "Are you sure you want to save all changes?" : "Submit this article for creation?")) {
                                                                let id;
                                                                callback().then(async id => {
                                                                    if (this.state.canPublishDocument) {
                                                                        await this.publishArticle()
                                                                    }
                                                                    if(id) {
                                                                        window.location.href = `article?id=${id}`;
                                                                    }
                                                                })
                                                                this.setState({editing: false});
                                                            }
                                                        }
                                                    }
                                                >
                                                    <div style={{ width: "250px" }}>{this.state.id ? `Save Updates` : `Create Article`}</div>
                                                </Button>
                                            </td>
                                            <td>
                                                <Button
                                                    trans={{ animation: "fadeInRight", delay: 1 }}
                                                    theme={Theme[this.props.STATE.THEME].complement}
                                                    pop
                                                    onClick={() => window.confirm("Are you sure you want clear all changes?") ? (this.state.id ? this.getArticle(this.state.editing) : this.setState(
                                                            this.defState(this.defState(false, this.state.canEditDocument, this.state.canPublishDocument, this.state.canCreateDocument)))
                                                        ) : null
                                                    }
                                                >
                                                    <div style={{ width: "250px" }}>Cancel Updates</div>
                                                </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Style.ChangeControls>
                        ) : null}
                        <Style.FooterData>
                            <Style.FooterDataAuthor>
                                <Text theme={this.props.STATE.THEME}>{this.state.authorName.split('|')[0].trim()}</Text>
                            </Style.FooterDataAuthor>
                            <Style.FooterDataDate>
                                <Text theme={this.props.STATE.THEME}>{moment(this.state.publisheddate).format("MMM Do, YYYY")}</Text>
                            </Style.FooterDataDate>
                        </Style.FooterData>
                    </Style.Content>
                </React.Fragment>: null}
            </Style.Base>
        )
    }
}