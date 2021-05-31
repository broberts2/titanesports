import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	root: {
		position: "relative",
		width: "calc(100% - 200px)",
		[theme.breakpoints.down("sm")]: {
			width: "calc(100% - 5px)",
		},
		height: "100%",
		padding: "100px",
		[theme.breakpoints.down("sm")]: {
			padding: "10px",
		},
	},
	body: {
		width: "100%",
		border: "2px solid black",
		paddingBottom: "50px",
	},
	input: {
		padding: "100px",
		[theme.breakpoints.down("sm")]: {
			padding: "10px",
		},
		paddingTop: "10px",
		paddingBottom: "10px",
	},
	typographyh3: {
		[theme.breakpoints.down("sm")]: {
			fontSize: theme.typography.h3.fontSize * 0.5,
		},
	},
	miniloader: {
		pointerEvents: "none",
		position: "fixed",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	},
}));
