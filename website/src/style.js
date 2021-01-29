import styled from "styled-components";
import { Theme } from "arclight-react";

export default {
    Base: styled.div`
        background-color: ${props => props.STATE ? Theme[props.STATE.THEME].backgroundColor : "#171717"};
        position: relative;
        font-weight: 900;
    `
}