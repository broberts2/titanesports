import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: { backgroundColor: theme.palette.background.default },
  promo: {
    width: "calc(100% - 200px)",
    padding: "100px",
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 40px)",
      padding: "20px",
    },
  },
}));
