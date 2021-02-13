import styled from "styled-components";

export default {
    Base: styled.div`
    `,
    FeedGridArticle: styled.div`
        ${props => !props.isPublished ? `box-shadow: 0px 0px 15px red;` : null}
        transition: all 0.15s ease;
        cursor: pointer;
        position: relative;
        width: 100%;
        height: 15vw;
        background-image: url(${props => props.backgroundImg});
        background-repeat: no-repeat;
        background-size: cover;
        border-radius: 4px;
    `,
    FeedGridArticleCrownImg: styled.div`
        position: absolute;
        top: 3px;
        left: 3px;
        width: 20%;
        border-radius: 4px;
        & img {
            width: 100%;
        }
    `,
    FeedGridArticleInfo: styled.div`
        position: absolute;
        top: 0;
        right: 0;
        margin: 15px;
        text-align: right;
    `,
    FeedGridArticleTitle: styled.div`
        display: inline-block;
        margin: 2.5px;
        padding: 5px;
        padding-left: 15px;
        padding-right: 15px;
        font-weight: 900;
        font-size: ${props => !props.mini ? `${(props.len > 20 ? 35 : 20)/props.len}vw` : `${(props.len > 20 ? 17.5 : 10)/props.len}vw`};
        background-color: ${props => props.backgroundColor};
        border-radius: 5px;
    `,
    FeedGridArticleCreated: styled.div`
        display: inline-block;
        margin: 2.5px;
        padding: 10px;
        font-weight: 900;
        font-size: ${props => !props.mini ? "1vw" : "0.75vw"};
        background-color: ${props => props.backgroundColor};
        border-radius: 5px;
    `,
    Tags: styled.div`
        display: inline-block;
        margin: 2.5px;
        pointer-events: none;
        font-weight: 900;
        font-size: ${props => !props.mini ? "1vw" : "0.75vw"};
    `,
    TagsItem: styled.div`
        text-align: center;
        padding: 0.1vw;
        width: ${props => props.mini ? "1.75vw" : "2vw"};
        height: ${props => props.mini ? "1.75vw" : "2vw"};
        background-color: ${props => props.backgroundColor};
        display: inline-flex;
        margin: 1.5px;
        border-radius: 4px;
    `,
    FeedGridArticleAuthor: styled.div`
        font-style: oblique;
        font-weight: 900;
        position: absolute;
        bottom: 0;
        right: 0;
        margin: 15px;
        font-size: ${props => !props.mini ? "1vw" : "0.75vw"};
        background-color: ${props => props.backgroundColor};
        padding-left: 30px;
        padding-right: 30px;
        border-radius: 5px;
    `
}