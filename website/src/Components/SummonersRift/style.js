import styled from "styled-components";

export default {
	Base: styled.div`
		width: 100%;
	`,
	BaseImg: styled.div`
		position: relative;
		width: calc(100% - 40px);
		padding: 20px;
		& img {
			cursor: pointer;
			border-radius: 10px;
			width: 100%;
		}
	`,
	Pin: styled.div`
		cursor: pointer;
		width: 10%;
		position: absolute;
		top: ${(props) => props.c.y};
		left: ${(props) => props.c.x};
		transform-origin: center;
		transition: all 0.25s ease;
		&:hover {
			z-index: 8;
			transform: scale(1.1);
		}
	`,
	PinBase: styled.div`
		z-index: 0;
		position: relative;
		width: 100%;
	`,
	PinUserImg: styled.div`
		transform-origin: center;
		top: 2%;
		left: 0%;
		z-index: 2;
		position: absolute;
		width: 100%;
		& img {
			border-radius: 50%;
			width: 100%;
		}
	`,
	PositionImg: styled.div`
		background-color: ${(props) => props.backgroundColor};
		padding: 10%;
		top: -10%;
		left: -25%;
		border-radius: 50%;
		position: absolute;
		width: 50%;
		& img {
			z-index: 3;
			position: relative;
			width: 100%;
		}
	`,
};
