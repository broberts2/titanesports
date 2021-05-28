import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	root: {},
	entities: {
		padding: "100px",
		[theme.breakpoints.down("xs")]: {
			padding: "10px",
		},
	},
	primaryselector: {
		padding: "100px",
	},
	search: {
		width: "50%",
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
