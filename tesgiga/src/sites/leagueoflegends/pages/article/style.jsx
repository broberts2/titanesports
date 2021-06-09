import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: { backgroundColor: theme.palette.background.default },
  body: {
    padding: "25px",
  },
  title: {
    fontSize: theme.typography.h2.fontSize,
    [theme.breakpoints.down("sm")]: {
      fontSize: theme.typography.h3.fontSize,
    },
    fontWeight: 1000,
  },
  blockTitle: {
    fontSize: theme.typography.h4.fontSize,
  },
  blockText: {
    fontSize: theme.typography.body1.fontSize,
  },
  block: {
    marginTop: "20px",
    marginBottom: "20px",
    padding: "10px",
  },
}));
