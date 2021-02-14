import styled from "styled-components";

export default {
    Base: styled.div`
        padding-top: 400px;
        padding-bottom: 0px;
    `,
    PageTitle: styled.div`
        position: absolute;
        top: 350px;
        left: 3vw;
        font-size: 4vw;
    `,
    Banner: styled.div`
        text-align: center;
        width: 100%;
        height: 40vw;
        & img {
            width: 75vw;
        }
    `,
    DropDownTitle: styled.div`
        font-size: 48px;
    `,
    DropDown: styled.div`
        width: 35%;
        min-width: 300px;
        padding: 30px;
        margin-bottom: -30px;
    `,
    TableTitle: styled.div`
        
    `,
    Table: styled.div`
        padding: 30px;
    `,
    Panel: styled.div`
        position: relative;
        background-color: ${props => props.backgroundColor};
        width: calc(100% - 20px);
        height: 300px;
        margin: 10px;
        margin-bottom: 30px;
        border-radius: 4px;
    `,
    Confirm: styled.div`
        position: absolute;
        bottom: 0;
        right: 0;

    `,
    Button: styled.div`
        display: inline-flex;
        padding: 10px;
    `,
    ControlsTitle: styled.div`
        font-size: 32px;
        font-weight: 900;
    `,
    ControlsDropdown: styled.div`
        padding: 30px;
    `,
    ControlsDropdownItem: styled.div`
    `
}
