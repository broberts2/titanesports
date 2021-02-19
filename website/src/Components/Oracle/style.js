import styled from "styled-components";

export default {
	Base: styled.div`
		padding-top: 400px;
		padding-bottom: 150px;
		min-height: 100vh;
	`,
	PageTitle: styled.div`
		position: absolute;
		top: 350px;
		left: 3vw;
		font-size: 4vw;
	`,
	Divider: styled.div`
		margin-top: 10vw;
		margin-bottom: 10vw;
	`,
	Banner: styled.div`
		text-align: center;
		width: 100%;
	`,
	BannerImg: styled.div`
		width: 100%;
		text-align: center;
		& img {
			width: 20%;
			border-radius: 50%;
			box-shadow: 0px 20px 1px 1px ${(props) => props.boxColor};
		}
	`,
	Panels: styled.div`
		padding: 20px;
		font-size: 2vw;
		& table {
			width: 100%;
			table-layout: fixed;
		}
	`,
};
