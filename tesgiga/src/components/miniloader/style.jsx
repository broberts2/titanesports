import { makeStyles } from "@material-ui/core/styles";

export default (props) =>
	makeStyles((theme) => ({
		root: {
			zIndex: 1499,
			width: "100%",
			height: "100%",
			position: "absolute",
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
