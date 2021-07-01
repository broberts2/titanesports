import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	root: { position: "relative" },
	preview: {
		width: "20%",
		maxHeight: "30%",
		position: "absolute",
		top: 0,
		right: 0,
		objectFit: "cover",
	},
}));
