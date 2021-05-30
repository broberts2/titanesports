import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	root: {
		pointerEvents: "none",
		backgroundColor: theme.palette.background.default,
		width: "100vw",
		height: "100vh",
	},
	poro: {
		width: "50%",
	},
}));
