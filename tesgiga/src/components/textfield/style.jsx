import { makeStyles } from "@material-ui/core/styles";

export default (props) =>
  makeStyles((theme) => ({
    root: {},
    inputProps: {
      color: theme.palette.background.default,
    },
  }));
