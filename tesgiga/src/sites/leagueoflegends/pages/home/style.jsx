import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    position: "relative",
    backgroundColor: theme.palette.background.default,
  },
  cardimg: {
    width: "100%",
    marginBottom: "10px",
    [theme.breakpoints.down("md")]: {
      width: "35%",
    },
  },
  typographycardtext: {
    color: theme.palette.background.default,
    fontSize: theme.typography.h4.fontSize,
    [theme.breakpoints.down("xs")]: {
      fontSize: theme.typography.h6.fontSize,
    },
  },
}));
