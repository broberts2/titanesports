import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	root: {
		position: "relative",
		backgroundColor: theme.palette.background.default,
	},
	cardimg: {
		width: "100%",
		marginBottom: "75px",
	},
	typographycardtext: {
		color: theme.palette.background.default,
		position: "absolute",
		bottom: 0,
		fontSize: theme.typography.h4.fontSize,
		[theme.breakpoints.down("sm")]: {
			fontSize: theme.typography.h6.fontSize,
		},
	},
}));
