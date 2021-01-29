import styled from "styled-components";

export default {
    Base: styled.div`
        padding-top: 225px;
        padding-bottom: 150px;
    `,
    Banner: styled.div`
        text-align: center;
        width: 100%;
        & img {
            width: 75%;
        }
    `,
    PageTitle: styled.div`
        position: absolute;
        top: 250px;
        left: 3vw;
        font-size: 4vw;
    `,
    Panel: styled.div`
        width: 100%;
        padding: 50px;
        & table {
            width: calc(100% - 100px);
        }
    `,
    PanelTitle: styled.div`
        width: 100%;
        font-size: 3vw;
    `,
    PanelBlurb: styled.div`
        width: calc(100% - 100px);
        font-size: 1.5vw;
    `,
    HoverCard: styled.div`
        width: 100%;
        height: 30vw;
        background-color: ${props => props.backgroundColor};
        border-radius: 8px;
        & img {
            width: 50%;
        }
    `,
    HoverCardTitle: styled.div`
        text-align: center;
        font-size: 3vw;
    `,
    HoverCardSubTitle: styled.div`
        text-align: center;
        font-size: 1.5vw;
    `,
    HoverCardMTitle: styled.div`
        text-align: center;
        font-size: 2vw;
    `
}
