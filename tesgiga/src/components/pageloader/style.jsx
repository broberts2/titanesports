import { makeStyles } from "@material-ui/core/styles";

export default (props) =>
	makeStyles((theme) => ({
		root: {
			zIndex: 1501,
			backgroundColor: theme.palette.primary.main,
			width: "100vw",
			height: "100vh",
			position: "fixed",
			top: 0,
			left: 0,
			pointerEvents: !props.loading ? "none" : "",
			transition: "all 1s ease",
			opacity: props.loading ? 1 : 0,
		},
		page: {
			position: "absolute",
			left: "50%",
			top: "50%",
			transform: "translate(-50%, -50%)",
		},
		spinner: {
			color: "red",
		},
	}));
