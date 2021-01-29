import styled from "styled-components";
import { Theme } from "arclight-react";

const _rarity = r => {
    switch(r) {
        case "legendary":
            return "orange";
        case "epic":
            return "purple";
        case "rare":
            return "blue";
        case "uncommon":
            return "green";
        default:
            return "white";
    }
}

export default {
    Base: styled.div`
        margin: calc(${props => props.size} / 4);
        display: inline-flex;
    `,
    HoverCard: styled.div`
    `,
    Front: styled.div`
        background-color: ${props => Theme[Theme[props.theme].complement].backgroundColor};
        width: ${props => props.size};
        height: ${props => props.size};
        border-radius: 50%;
        box-shadow: inset 0 0 calc(${props => props.size} / 4) ${props => _rarity(props.cfg.rarity)};
        padding: 0px;
    `,
    Back: styled.div`
        background-color: ${props => Theme[Theme[props.theme].complement].backgroundColor};
        width: ${props => props.size};
        height: ${props => props.size};
        border-radius: 50%;
        padding: 0px;
    `,
    BackTitle: styled.div`
        text-align: center;
        font-size: 120%;
        border-bottom: 1px solid ${props => Theme[Theme[props.theme].complement].textColor};
        padding-bottom: 10px;
        margin-bottom: 10px;
    `,
    BackText: styled.div`
        font-size: 100%;
    `,
    PrimaryImg: styled.div`
    padding: 10px;
        & img {
            width: 100%;
            height: 100%;
        }
    `,
    Points: styled.div`
        font-style: italic;
        font-size: calc(${props => props.size} / 8);
        position: absolute;
        margin-top: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    `,
    Crown: styled.div`
        margin-top: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 175%;
    `
}