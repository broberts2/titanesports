import styled from "styled-components";

export default {
    Base: styled.div`
        padding-top: 400px
    `,
    PageTitle: styled.div`
        position: absolute;
        top: 350px;
        left: 3vw;
        font-size: 3vw;
    `,
    Banner: styled.div`
        text-align: center;
        width: 100%;
        & img {
            width: 75%;
        }
    `,
    Content: styled.div`
        padding: 50px;
    `,
    FeaturedArticles: styled.div`
        & table {
            width: 100%;
            table-layout: fixed;
        }
    `,
    FeaturedArticlesTitle: styled.div`
        font-size: 2.5vw;
        margin-left: 25px;
    `,
    ArticlePreview: styled.div`
        border: ${props => props.mini ? "0px" : "4px"} solid ${props => props.borderColor};
        border-radius: 6px;
        padding: 2px;
    `,
    ArticleFeedControls: styled.div`
        margin-left: 25px;
    `,
    ArticleFeedControlsButton: styled.div`
        opacity: ${props => props.active ? 1 : 0.35};
    `,
    ArticleFeed: styled.div`
        padding: 25px;
        & table {
            width: 100%;
            table-layout: fixed;
        }
        max-height: 35vw;
        overflow: auto;
    `,
    Create: styled.div`
        text-align: center;
    `,
    __temp__: styled.div`
        
    `
}