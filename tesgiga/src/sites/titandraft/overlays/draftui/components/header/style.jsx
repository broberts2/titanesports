import { makeStyles } from "@material-ui/core/styles";
import Labels from "labels/index";

export default makeStyles((theme) => ({
  header: {
    width: "100%",
    height: "12.5vh",
    position: "relative",
  },
  logoImg: {
    height: "200%",
  },
  titlebar: {
    width: `calc(100% - 40px)`,
    position: "relative",
    padding: "20px",
    height: "100%",
  },
  titlebarImg: {
    height: "125%",
  },
}));
