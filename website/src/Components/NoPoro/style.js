import styled from "styled-components";
import { Theme } from "arclight-react";

export default {
    Base: styled.div`
        position: relative;
        width: 100%;
        height: 100%;
        text-align: ${props => props.align ? props.align : "center"};
        & img {
            opacity: 0.35;
            width: 100%;
            border-radius: 10px;
        }
    `,
    PoroText: styled.div`
        font-style: italic;
        font-size: 2vw;
        position: absolute;
        top: 75%;
        left: 50%;
        transform: translate(-50%, -75%);
    `
}