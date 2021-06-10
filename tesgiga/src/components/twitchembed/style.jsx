import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    width: "calc(100% - 100px)",
    height: "500px",
    padding: "50px",
    [theme.breakpoints.down("sm")]: {
      height: "300px",
      width: "calc(100% - 10px)",
      paddingLeft: "5px",
      paddingRight: "5px",
    },
  },
}));
