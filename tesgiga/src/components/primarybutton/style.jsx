import { makeStyles } from "@material-ui/core/styles";

export default (props) =>
	makeStyles((theme) => ({
		root: {
			margin: theme.spacing(1),
			width: props.fill ? `calc(100% - ${theme.spacing(1) * 2}px)` : "",
		},
	}));
