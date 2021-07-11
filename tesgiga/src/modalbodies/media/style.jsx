import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	root: {
		position: "relative",
		width: "100%",
		height: "100%",
	},
	media: {
		width: "50%",
	},
	controls: {
		position: "absolute",
		right: 0,
		bottom: 0,
	},
}));
