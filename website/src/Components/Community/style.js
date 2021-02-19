import styled from "styled-components";

export default {
	Base: styled.div`
		padding-top: 400px;
		min-height: 100vh;
		padding-bottom: 150px;
	`,
	Banner: styled.div`
		text-align: center;
		width: 100%;
		& img {
			width: 25%;
		}
	`,
	PageTitle: styled.div`
		position: absolute;
		top: 250px;
		left: 3vw;
		font-size: 4vw;
	`,
	Blurb: styled.div`
		width: calc(100% - 100px);
		font-size: 1.5vw;
		padding: 50px;
	`,
	List: styled.div`
		width: calc(100% - 100px);
		padding: 50px;
		& table {
			margin-top: 50px;
			width: 100%;
		}
	`,
	ListSearch: styled.div`
		width: 25%;
	`,
	Panel: styled.div`
		position: relative;
		width: 100%;
		height: 12.5vw;
	`,
	PanelContent: styled.div`
		cursor: pointer;
		position: absolute;
		top: 0;
		left: 0;
		background-color: ${(props) => props.backgroundColor};
		width: 100%;
		height: 100%;
		border-radius: 6px;
		transition: all 0.3s ease;
		&:hover {
			transform: scale(1.05);
		}
	`,
	PanelContentTitle: styled.div`
		font-size: 1vw;
		padding: 1vw;
	`,
};
