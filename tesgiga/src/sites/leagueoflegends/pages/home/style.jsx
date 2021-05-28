import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	root: {
		position: "relative",
	},
	cardimg: {
		width: "100%",
		marginBottom: "75px",
	},
	typographycardtext: {
		position: "absolute",
		bottom: 0,
		fontSize: theme.typography.h2.fontSize,
		[theme.breakpoints.down("sm")]: {
			fontSize: theme.typography.h6.fontSize,
		},
	},
}));
