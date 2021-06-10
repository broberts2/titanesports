import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    padding: "100px",
    paddingTop: "0px",
    textAlign: "center",
    fontSize: theme.typography.fontSize * 4,
    [theme.breakpoints.down("sm")]: {
      padding: "10px",
      fontSize: theme.typography.fontSize * 1.25,
    },
  },
}));
