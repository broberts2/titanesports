import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	root: {
		position: "relative",
		backgroundColor: theme.palette.background.default,
		width: "100vw",
		height: "100vh",
		overflow: "hidden",
	},
	listitem: {
		marginRight: "5px",
	},
	displayName: {
		padding: "10px",
		position: "absolute",
		right: 0,
		top: 0,
	},
	primarycontainer: {
		width: "100%",
		height: "100%",
	},
	content: {
		width: "100%",
		height: "100%",
		padding: "0px",
		paddingTop: "0px",
	},
	innercontent: {
		paddingTop: "80px",
		overflow: "hidden",
		width: "100%",
		height: "calc(100% - 80px)",
	},
	drawer: {
		backgroundColor: theme.palette.background.default,
		height: "100vh",
		overflowY: "auto",
		[theme.breakpoints.down("xs")]: {
			width: "100%",
			zIndex: 1490,
			position: "absolute",
			top: 0,
			left: 0,
		},
	},
	panel: { width: "100%", height: "100vh" },
}));
