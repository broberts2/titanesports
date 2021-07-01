import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	root: {
		width: "100%",
		height: "100%",
		position: "relative",
	},
	fabs: {
		position: "absolute",
		top: "calc(100% - 50px)",
		left: "50%",
		transform: "translate(-50%, -50%)",
		transition: "all 0.5s ease",
	},
	close: {
		zIndex: 1500,
		position: "absolute",
		top: 0,
		right: 0,
		padding: "25px",
	},
	subfabs: {
		margin: "25px",
	},
	typography4: {
		//backgroundColor: theme.palette.background.default,
		//borderRadius: "10px",
		//padding: 10,
		[theme.breakpoints.down("sm")]: {
			fontSize: `calc(${theme.typography.h4.fontSize} / 1.5)`,
		},
	},
	poro: {
		opacity: 0.25,
		width: "75%",
		[theme.breakpoints.down("sm")]: {
			width: "100%",
		},
	},
}));
