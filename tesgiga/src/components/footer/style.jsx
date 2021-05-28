import { makeStyles } from "@material-ui/core/styles";

export default (props) =>
	makeStyles((theme) => ({
		root: {
			position: props.tranparent ? "absolute" : "relative",
			zIndex: 1500,
		},
		toolbarbuttons: {},
		appbar: {
			backgroundColor: props.transparent ? "transparent" : "",
		},
		title: {
			fontStyle: "italic",
			marginLeft: "25px",
			minWidth: "400px",
			[theme.breakpoints.down("sm")]: {
				marginLeft: "15px",
				fontSize: 12,
			},
		},
	}));
