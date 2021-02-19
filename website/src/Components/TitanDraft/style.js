import styled from "styled-components";

export default {
	Base: styled.div`
		padding-top: 225px;
		padding-bottom: 150px;
		min-height: 100vh;
	`,
	PageTitle: styled.div`
		position: absolute;
		top: 250px;
		left: 3vw;
		font-size: 4vw;
	`,
	Orb: styled.div`
		display: inline-block;
		width: 25vw;
		height: 25vw;
		border-radius: 50%;
		border: 0px solid ${(props) => props.borderColor};
		border-radius: 50%;
		box-shadow: 0px 10px 10px 20px ${(props) => props.borderColor};
		& video {
			border-radius: 50%;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
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
	Interface: styled.div`
		padding: 50px;
	`,
	InterfaceBlock: styled.div`
		padding: 25px;
		text-align: center;
	`,
	InterfaceDropdownTitle: styled.div`
		font-size: 2vw;
	`,
	__temp__: styled.div``,
};
