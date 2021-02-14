import styled from "styled-components";

export default {
	Base: styled.div`
		position: relative;
		background-color: ${(props) => props.backgroundColor};
	`,
	Banner: styled.div`
		postion: relative;
		width: 100%;
		height: 35vw;
		min-height: 300px;
		border-bottom: 10px solid ${(props) => props.lineColor};
	`,
	BannerProfileImg: styled.div`
		margin-top: calc(-20vw / 3);
		margin-left: 5%;
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
	Title: styled.div`
		text-align: right;
	`,
	TitlePrimary: styled.div`
		padding-right: 3vw;
		font-style: italic;
		font-size: 5vw;
	`,
	TitleSecondary: styled.div`
		padding-right: 5vw;
		font-style: italic;
		font-size: 1.75vw;
	`,
	ProfileCrown: styled.div`
		position: relative;
		text-align: center;
		& img {
			width: 17.5%;
		}
	`,
	SectionHeader: styled.div`
		font-size: 3vw;
	`,
	SubSectionHeader: styled.div`
		font-size: 1.5vw;
		font-style: italic;
	`,
	PageContent: styled.div`
		padding: 30px;
	`,
	Badges: styled.div`
		& table {
			width: 100%;
			table-layout: fixed;
		}
	`,
	ModifyButtons: styled.div`
		position: absolute;
		right: 55px;
		top: 350px;
		& > * {
			margin: 5px;
			margin-right: 0px;
		}
	`,
	NoBadges: styled.div`
		font-size: 1.5vw;
		padding: 60px;
	`,
	ModifyBanner: styled.div`
		position: absolute;
		top: 40%;
		right: 25px;
	`,
	ModifyCrown: styled.div`
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
	`,
	__temp__: styled.div``,
};
