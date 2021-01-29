import styled from "styled-components";

export default {
    Base: styled.div`
        position: relative;
        height: ${props => props.height};
        background-color: rgba(0, 0, 0, 0.5);
    `,
    BrandImg: styled.div`
        height: calc(${props => props.height} * 0.7);
        & img {
            height: 100%;
        }
    `,
    IconList: styled.div`
        text-size: 50px;
    `,
    Icon: styled.div`
    `
}