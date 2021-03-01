import styled from "styled-components";

export default {
	Base: styled.div`
		position: relative;
		width: 100%;
		height: 100%;
		overflow: auto;
		overflow-x: hidden;
	`,
	Component: styled.div`
		padding: 10px;
	`,
	Title: styled.div`
		text-align: left;
		font-style: italic;
		font-size: 3vw;
	`,
	Title2: styled.div`
		text-align: left;
		font-style: italic;
		font-size: 1.8vw;
	`,
	Description: styled.div`
		text-align: left;
		font-size: 2vw;
	`,
	Execute: styled.div`
		${(props) => (!props.isValid ? "pointer-events: none;" : null)}
		${(props) => (props.isValid ? "opacity: 1;" : "opacity: 0.25;")}
        text-align: center;
	`,
	ScrollItemsWrapper: styled.div`
		border-radius: 4px;
		border: 2px solid black;
	`,
	ItemTitle: styled.div`
		font-size: 1vw;
		text-align: left;
	`,
	ScrollItems: styled.div`
		${(props) =>
			props.flex
				? `display: flex;
        flex-direction: column;`
				: "height: 200px;"}
		overflow: auto;
	`,
	Dropdown: styled.div``,
	ScrollItemsItem: styled.div`
		&:hover {
			background-color: red;
		}
		background-color: ${(props) => (props.isSelected ? "blue" : "")};
		cursor: pointer;
		text-align: left;
		padding: 3px;
		font-size: 0.8vw;
		min-font-size: 0.7vw;
	`,
	UrlImageImage: styled.div`
		text-align: left;
		& img {
			width: 350px;
		}
	`,
};
