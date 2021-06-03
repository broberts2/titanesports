import { makeStyles } from "@material-ui/core/styles";

export default (props) =>
	makeStyles((theme) => ({
		root: {
			backgroundColor: theme.palette.primary.main,
			cursor: props.onClick && !props.disabled ? "pointer" : "",
			height: props.fill ? `calc(100% - ${theme.spacing(1) * 2}px)` : "",
			margin: theme.spacing(1),
			transform: props.onClick ? "scale(0.975)" : "",
			"&:hover": {
				transform: props.onClick && !props.disabled ? "scale(1)" : "",
			},
			transition: "all 0.5s ease",
			opacity: props.disabled ? 0.5 : 1,
			color: theme.palette.background.default,
		},
	}));
