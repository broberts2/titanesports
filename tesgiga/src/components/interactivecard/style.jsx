import { makeStyles } from "@material-ui/core/styles";

export default (props) =>
  makeStyles((theme) => ({
    root: {
      backgroundColor: props.invertColor
        ? theme.palette.background.default
        : theme.palette.primary.main,
      cursor: props.onClick && !props.disabled ? "pointer" : "",
      height: props.fill ? `calc(100% - ${theme.spacing(1) * 2}px)` : "",
      margin: theme.spacing(1),
      transform: props.onClick ? "" : "",
      "&:hover": {
        transform: props.onClick && !props.disabled ? "scale(1.025)" : "",
      },
      transition: "all 0.5s ease",
      opacity: props.disabled ? 0.5 : 1,
      color: props.invertColor
        ? theme.palette.primary.main
        : theme.palette.background.default,
    },
  }));
