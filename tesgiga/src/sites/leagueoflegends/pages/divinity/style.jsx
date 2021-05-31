import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	root: { backgroundColor: theme.palette.background.default },
	radioButton: {
		margin: "100px",
		[theme.breakpoints.down("sm")]: {
			margin: "10px",
		},
		marginTop: "0px",
		marginBottom: "0px",
	},
}));
