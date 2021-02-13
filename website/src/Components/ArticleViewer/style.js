import styled from "styled-components";
import { Theme } from "arclight-react";

export default {
    Base: styled.div`
        min-height: 100vh;
    `,
    Banner: styled.div`
        position: relative;
        width: 100%;
        height: 32.5vw;
        overflow: hidden;
        & img {
            width: 100%;
        }
    `,
    EditBanner: styled.div`
        position: absolute;
        top: 0;
        right: 5vw;
        width: 25%;
    `,
    EditToggle: styled.div`
        position: absolute;
        top: 0;
        left: 5vw;
        width: 25%;
    `,
    PublishDocument: styled.div`
        position: absolute;
        top: 50px;
        left: 5vw;
        width: 25%;
    `,
    PublishDisplay: styled.div`
        color: ${props => props.isPublished ? "green" : "red"};
        font-style: italic;
        font-size: 3vw;
        padding: 75px;
        float: right;
    `,
    Divider: styled.div`
        position: relative;
        width: 100%;
    `,
    IconImg: styled.div`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        & img {
            width: 20vw;
        }
    `,
    IconImgField: styled.div`
        width: 350px;
        position: absolute;
        top: 60%;
        transform: translateY(-60%);
        left: 100%;
    `,
    Content: styled.div`
        position: relative;
        margin: 50px;
        margin-top: 12.5vw;
        border: 10px solid;
        border-image-slice: 1;
        border-width: 4px;
        border-image-source: linear-gradient(to bottom, ${props => Theme[Theme[props.theme].complement].backgroundColor}, rgba(0,0,0,0));
        padding: 5vw;
    `,
    Title: styled.div`
        padding: 4vw;
        padding-top: 0px;
        padding-bottom: 0px;
        position: absolute;
        top: 0;
        left: 2.5%;
        transform: translate(2.5%, -60%);
        font-size: ${props => props.len > 20 ? 125 / props.len : 4.5}vw;
        background-color: ${props => Theme[props.theme].backgroundColor};
    `,
    Block: styled.div`
        margin: 3vw;
        margin-left: 0px;
        margin-right: 0px;
    `,
    BlockTitle: styled.div`
        font-size: 2.75vw;
        margin-bottom: 1vw;
    `,
    BlockContent: styled.div`
        font-size: 1.5vw;
        ${ props => !props.editing ? `text-indent: 0px;` : null};
        margin-bottom: 85px;
    `,
    NewBlock: styled.div`
        text-align: right;
        margin-top: 14px;
    `,
    ChangeControls: styled.div`
        ${props => !props.isActive ? `pointer-events: none;` : null}
        opacity: ${props => props.isActive ? 1 : 0.25};
    `,
    Tags: styled.div`
        position: absolute;
        top: 100%;
        left: 50px;
        transform: translateY(-100%);
    `,
     FooterData: styled.div`
        text-align: right;
    `,
    FooterDataAuthor: styled.div`
        font-size: 4vw;
    `,
    FooterDataDate: styled.div`
        font-size: 2vw;
    `,
    __temp__: styled.div`
        
    `
}