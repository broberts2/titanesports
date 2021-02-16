import styled from "styled-components";

export default {
	Base: styled.div`
		padding-bottom: 200px;
		min-height: 100vh;
	`,
	Badges: styled.div`
		& table {
			width: 100%;
		}
	`,
	Banner: styled.div`
		postion: relative;
		width: 100%;
		height: 35vw;
		min-height: 300px;
		border-bottom: 10px solid ${(props) => props.lineColor};
	`,
	BannerBGImg: styled.div`
		width: 100%;
		height: 100%;
		overflow: hidden;
		& img {
			object-fit: cover;
			width: 100%;
			height: 100%;
		}
	`,
	BannerTeamImg: styled.div`
		background-color: ${(props) => props.backgroundColor};
		margin-top: calc(-20vw / 2);
		margin-left: calc(50% - 10vw);
		width: 20vw;
		height: 20vw;
		border: 10px solid ${(props) => props.lineColor};
		border-radius: 50%;
		overflow: hidden;
		& img {
			width: 100%;
			height: 100%;
		}
	`,
	TitlePrimary: styled.div`
		padding: 2vw;
		font-style: italic;
		font-size: 3vw;
		margin-bottom: 100px;
	`,
	SummonersRift: styled.div`
		text-align: center;
	`,
	MembersTitle: styled.div`
		padding: 2vw;
		font-size: 2.5vw;
	`,
	MemberRow: styled.div`
		position: relative;
		width: calc(100% - 12vw);
		height: 25px;
		padding: 2vw;
		margin-bottom: 5vw;
	`,
	MemberRowContent: styled.div`
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
	MemberRowTitle: styled.div`
		font-size: 1.5vw;
	`,
	MemberRowPosition: styled.div`
		font-style: italic;
		font-size: 1.5vw;
		bottom: 1.8vw;
		position: absolute;
	`,
	MemberRowPositionImg: styled.div`
		display: inline-block;
		position: absolute;
		top: 57.5%;
		right: 100px;
		background-color: ${(props) => props.backgroundColor};
		border-radius: 50%;
		padding: 1vw;
		transform: translateY(-50%);
		border: 0.6vw solid ${(props) => props.borderColor};
		& img {
			height: 6vw;
		}
	`,
};
