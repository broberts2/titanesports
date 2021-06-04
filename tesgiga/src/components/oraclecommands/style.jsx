import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	document: {
		width: "100%",
		height: "100%",
		position: "relative",
		backgroundColor: "red",
	},
	floatImg: {
		height: "100%",
		position: "absolute",
		top: "50%",
		left: "0px",
		transform: "translate(-50%, -50%)",
	},
}));
