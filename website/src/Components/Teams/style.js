import styled from "styled-components";

export default {
	Base: styled.div`
		padding-top: 225px;
		padding-bottom: 150px;
		min-height: 100vh;
	`,
	Banner: styled.div`
		text-align: center;
		width: 100%;
		min-height: 75vh;
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
	Divider: styled.div`
		margin-top: 0;
		margin-bottom: 10vw;
	`,
	TeamsTitle: styled.div`
		padding: 2vw;
		font-size: 2.5vw;
	`,
	TeamRow: styled.div`
		position: relative;
		width: calc(100% - 12vw);
		height: 25px;
		padding: 2vw;
		margin-bottom: 5vw;
	`,
	TeamRowContent: styled.div`
		cursor: pointer;
		position: absolute;
		border-radius: 8px;
		background-color: ${(props) => props.backgroundColor};
		width: 100%;
		height: 100%;
		padding: 2vw;
		transition: all 0.25s ease;
		&:hover {
			transform: scale(1.01);
		}
	`,
	TeamRowTitle: styled.div`
		font-size: 2.5vw;
	`,
	TeamRowPositionImg: styled.div`
		display: inline-block;
		position: absolute;
		top: 57.5%;
		right: 100px;
		background-color: ${(props) => props.backgroundColor};
		border-radius: 50%;
		overflow: hidden;
		padding: 1vw;
		transform: translateY(-50%);
		border: 0.4vw solid ${(props) => props.borderColor};
		width: 6vw;
		height: 6vw;
		& img {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 75%;
			object-fit: cover;
		}
	`,
};
