import { makeStyles } from "@material-ui/core/styles";

export default (props) =>
	makeStyles((theme) => ({
		root: {
			position: props.tranparent ? "absolute" : "relative",
		},
		toolbarbuttons: {
			marginLeft: "auto",
		},
		appbar: {
			backgroundColor: props.transparent ? "transparent" : "",
		},
		title: {
			cursor: "pointer",
			fontStyle: "italic",
			marginLeft: "25px",
			marginTop: "30px",
			minWidth: "400px",
			[theme.breakpoints.down("md")]: {
				marginLeft: "15px",
				marginTop: "17.5px",
				fontSize: 12,
			},
		},
		logo: {
			height: "75px",
			padding: "15px",
			[theme.breakpoints.down("md")]: {
				display: "none",
			},
		},
		buttons: {
			textAlign: "right",
			marginTop: "30px",
			[theme.breakpoints.down("md")]: {
				display: "none",
			},
		},
	}));
