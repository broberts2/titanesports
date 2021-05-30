import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	root: {
		overflowX: "hidden",
		backgroundColor: theme.palette.background.default,
	},
	entities: {
		padding: "100px",
		[theme.breakpoints.down("xs")]: {
			padding: "10px",
		},
	},
	primaryselector: {
		padding: "100px",
		[theme.breakpoints.down("xs")]: {
			padding: "10px",
		},
	},
	search: {
		width: "50%",
		[theme.breakpoints.down("xs")]: {
			width: "100%",
		},
	},
	typography4: {
		//backgroundColor: theme.palette.background.default,
		//borderRadius: "10px",
		//padding: 10,
		[theme.breakpoints.down("sm")]: {
			fontSize: `calc(${theme.typography.h4.fontSize} / 1.5)`,
		},
	},
	typography6: {
		[theme.breakpoints.down("sm")]: {
			fontSize: `calc(${theme.typography.h6.fontSize} / 2)`,
		},
	},
	formselector: {
		position: "absolute",
		right: 0,
		top: 0,
	},
	fabs: {
		position: "fixed",
		bottom: "50px",
		left: "50%",
		transform: "translateX(-50%)",
		transition: "all 0.5s ease",
	},
	subfabs: {
		margin: "50px",
	},
}));
