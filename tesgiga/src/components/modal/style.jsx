import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	root: {
		zIndex: 1500,
		width: "100vw",
		height: "100vh",
		position: "fixed",
		top: 0,
		left: 0,
	},
	backdrop: {
		zIndex: 1498,
		width: "100%",
		height: "100%",
		backgroundColor: "black",
		position: "absolute",
		transition: "all 0.25s ease",
	},
	body: {
		borderRadius: "6px",
		overflow: "hidden",
		position: "relative",
		zIndex: 1499,
		width: "50vw",
		height: "50vh",
		backgroundColor: theme.palette.background.default,
		padding: "25px",
	},
}));
