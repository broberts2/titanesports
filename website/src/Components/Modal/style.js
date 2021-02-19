import styled from "styled-components";

export default {
	Base: styled.div`
		padding: 10px;
		position: relative;
		width: calc(100% - 20px);
		height: calc(100% - 20px);
		background-image: url(${(props) => props.backgroundImg});
		background-repeat: no-repeat;
		background-size: cover;
		border-radius: 6px;
		overflow: hidden;
	`,
	SignIn: styled.div`
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-image: url(${(props) =>
			props.ENDPOINT}/static/assets/discord.png);
		background-repeat: no-repeat;
		background-size: cover;
		padding: 25px;
		padding-top: 125px;
		padding-bottom: 125px;
		border-radius: 4px;
	`,
	SignInContent: styled.div`
		text-align: left;
		width: 500px;
		max-width: 100%;
		background-color: rgba(0, 0, 0, 0.75);
		padding: 30px;
		border-radius: 4px;
		margin-top: 100px;
		margin-bottom: -100px;
	`,
	SignInField: styled.div`
		padding: 10px;
	`,
	SignInButton: styled.div`
		text-align: center;
		transition: all 0.25s ease;
		${(props) => (!props.active ? "pointer-events: none;" : null)}
		${(props) => (!props.active ? "opacity: 0.15;" : null)}
	`,
	BaseBadge: styled.div``,
	Badge: styled.div`
		pointer-events: none;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 0;
	`,
	BadgeTitle: styled.div`
		font-size: 3vw;
		font-style: italic;
		position: absolute;
		top: 100px;
		right: 75px;
	`,
	BadgeRarity: styled.div`
		color: ${(props) => props.color};
		font-size: 2vw;
		font-style: italic;
		position: absolute;
		top: 200px;
		right: 100px;
	`,
	Description: styled.div`
		font-size: 1.25vw;
		position: absolute;
		right: 0;
		top: 75%;
		transform: translateY(-75%);
		width: 60%;
		text-align: left;
	`,
	FilePickerBase: styled.div`
		width: 100%;
		height: 100%;
	`,
	Table: styled.div`
		width: 100%;
		height: 100%;
		overflow: auto;
	`,
	TableControls: styled.div`
		position: absolute;
		bottom: 10px;
		right: 10px;
	`,
	TablePreview: styled.div`
		text-align: right;
		width: 75px;
		height: 75px;
		& img {
			width: 100%;
			height: 100%;
		}
	`,
	ImagePicker: styled.div`
		height: 100%;
		overflow: auto;
		overflow-x: hidden;
	`,
	ImagePickerList: styled.div`
		& table {
			width: 100%;
			table-layout: fixed;
			td {
				transition: all 0.2s ease;
			}
		}
		& img {
			width: 100%;
			border-radius: 10px;
			cursor: pointer;
		}
	`,
	TitanDraftTitle: styled.div`
		font-size: 3vw;
		font-style: italic;
		position: absolute;
		top: 10px;
		left: 75px;
	`,
	TitanDraftStatus: styled.div`
		margin-top: 100px;
		font-size: 2vw;
	`,
	TitanDraftVs: styled.div`
		height: 75%;
		overflow-x: hidden;
		overflow-y: auto;
		width: 100%;
		& table {
			table-layout: fixed;
			width: 100%;
		}
		& img {
			width: 100%;
		}
	`,
	TitanDraft: styled.div`
		height: 100%;
	`,
};
