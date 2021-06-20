import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: { backgroundColor: theme.palette.background.default },
  builder: {
    padding: "100px",
    paddingTop: "0px",
    [theme.breakpoints.down("sm")]: {
      padding: "20px",
    },
  },
  element: {
    margin: "50px",
    marginRight: "0px",
    marginLeft: "0px",
    height: "200px",
    padding: "50px",
    paddingTop: "0px",
    paddingBottom: "0px",
  },
  subelement: {
    height: "50px",
  },
  loader: {
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
  },
}));
