import { makeStyles } from "@material-ui/core/styles";

export default (props) =>
  makeStyles((theme) => ({
    root: {
      color: "red",
    },
    inputProps: {
      color: props.invertColor ? theme.palette.background.default : "",
    },
    inputLabelProps: {
      color: props.invertColor ? theme.palette.background.default : "",
    },
  }));
