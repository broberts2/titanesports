import styled from "styled-components";
import { Theme } from "arclight-react";

export default {
    Base: styled.div``,
    Banner: styled.div`
        position: relative;
        width: 100%;
        height: 32.5vw;
    `,
    Button: styled.div`
        position: absolute;
        top: 60%;
        left: 50%;
        transform: translate(-50%, -60%);
    `,
    Divider: styled.div`
        position: relative;
        width: 100%;
    `,
    OverlayImg: styled.div`
        position: absolute;
        top: -5%;
        left: 41%;
        transform: transition(-41%, -5%);
        & img {
            width: 17vw;
        }
    `,
    InfoBlock: styled.div`
        text-align: center;
        padding: 4vw;
        margin-top: 8vw;
        font-size: 32px;
    `,
    Grid: styled.div`
        width: 100%;
        height: 25vw;
        & table {
            width: calc(100% - 80px);
            height: 100%;
        }
    `,
    PanelItem: styled.div`
        position: relative;
        width: 100%;
        height: 100%;
        margin: 40px;
        margin-top: ${props => props.marginTop};
    `,
    PanelItemIcon: styled.div`
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        position: absolute;
        pointer-events: none;
        & img {
            filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(345deg) brightness(103%) contrast(104%);
            margin-left: 25%;
            margin-top: -${props => props.marginTop};
            width: 50%;
        }
    `,
    PanelTitle: styled.div`
        pointer-events: none;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    `,
    PanelTitleText: styled.div`
        padding: 5px;
        padding-left: 10px;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.75);
        font-size: 2vw;
    `,
    PanelContent: styled.div`
        position: relative;
        width: 100%;
        height: ${props => props.height};
        background-color: white;
        border-radius: 4px;
        overflow: hidden;
    `,
    FeedDivider: styled.div`
        position: absolute;
        width: calc(100% - 100px);
        border-top: 0px solid white;
        margin-left: 50px;
        top: 50%;
        transform: translateY(-50%);
    `,
    FeedDividerText: styled.div`
        text-align: right;
        width: 60vw;
        right: 0;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-size: 3vw;
        font-weight: 900;
    `,
    FeedBanner: styled.div`
        width: 100%;
        height: 10vw;
        background:linear-gradient(to right, transparent, ${props => Theme[Theme[props.STATE.THEME].complement].backgroundColor}, ${props => Theme[Theme[props.STATE.THEME].complement].backgroundColor});
        position: relative;
        margin-top: 20vw;
    `,
    FeedBannerImg: styled.div`
        position: absolute;
        bottom: 200%;
        height: 100%;
        & img {
            height: 350%;
        }
    `,
    FeedGrid: styled.div`
        padding: 30px;
        margin-top: 8vw;
        & table {
            width: 100%;
        }
    `,
    FeedGridArticle: styled.div`
        opacity: ${props => props.stateId > 0 ? (props.stateId === props.id ? 1 : 0.5 ) : 1};
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
    FeedGridArticleTitle: styled.div`
        font-weight: 900;
        position: absolute;
        top: 0;
        right: 0;
        margin: 15px;
        font-size: 2vw;
        background-color: rgba(0, 0, 0, 0.75);
        padding-left: 30px;
        padding-right: 30px;
        border-radius: 5px;
    `,
    FeedGridArticleCreated: styled.div`
        font-weight: 900;
        position: absolute;
        top: 3vw;
        right: 0;
        margin: 15px;
        font-size: 1vw;
        background-color: rgba(0, 0, 0, 0.75);
        padding-left: 30px;
        padding-right: 30px;
        border-radius: 5px;
    `,
    FeedGridArticleAuthor: styled.div`
        font-style: oblique;
        font-weight: 900;
        position: absolute;
        bottom: 0;
        right: 0;
        margin: 15px;
        font-size: 1vw;
        background-color: rgba(0, 0, 0, 0.75);
        padding-left: 30px;
        padding-right: 30px;
        border-radius: 5px;
    `
}
