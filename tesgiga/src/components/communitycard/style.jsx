import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	root: {
		cursor: "pointer",
		position: "relative",
		marginTop: "15vh",
		transform: "scale(0.975)",
		transition: "all 0.5s ease",
		"&:hover": {
			transform: "scale(1)",
		},
	},
	crown: {
		zIndex: 1000,
		position: "absolute",
		top: 0,
		left: "50%",
		borderRadius: "50%",
		transform: "translate(-50%, -50%)",
		width: "50%",
		padding: "6px",
		backgroundColor: "white",
		"& img": {
			borderRadius: "50%",
			width: "100%",
		},
	},
	miniblock: {
		marginTop: "25px",
		marginBotton: "25px",
	},
	content: {
		width: "100%",
		padding: "10px",
		paddingTop: "125px",
	},
}));
