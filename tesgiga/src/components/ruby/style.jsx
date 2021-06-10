import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    color: theme.palette.primary.main,
    position: "relative",
    width: "100%",
    height: "400px",
    "& img": {
      height: "75%",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    [theme.breakpoints.down("sm")]: {
      height: "150px",
    },
  },
  icon: {
    width: "10%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));
