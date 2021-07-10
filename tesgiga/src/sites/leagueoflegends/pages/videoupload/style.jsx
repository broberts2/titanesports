import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	root: { backgroundColor: theme.palette.background.default },
	videoupload: {
		padding: "100px",
		paddingTop: "0px",
		paddingBottom: "0px",
	},
	sub: {
		textAlign: "center",
		width: "25vw",
		"& img": {
			width: "100%",
		},
		[theme.breakpoints.down("sm")]: {
			fontSize: theme.typography.h6.fontSize,
			width: "50vw",
		},
	},
}));
