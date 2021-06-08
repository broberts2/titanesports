import { makeStyles } from "@material-ui/core/styles";

export default (props) =>
  makeStyles((theme) => ({
    root: {
      position: props.tranparent ? "absolute" : "relative",
      width: "100%",
      overflow: "hidden",
    },
    toolbarbuttons: {
      marginLeft: "auto",
      textAlign: "right",
    },
    appbar: {
      backgroundColor: props.transparent ? "transparent" : "",
    },
    title: {
      cursor: "pointer",
      fontStyle: "italic",
      marginLeft: "25px",
      marginTop: "30px",
      minWidth: "400px",
      [theme.breakpoints.down("md")]: {
        marginLeft: "15px",
        marginTop: "17.5px",
        fontSize: 12,
      },
    },
    logo: {
      height: "75px",
      padding: "15px",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    buttons: {
      textAlign: "right",
      marginTop: "35px",
      [theme.breakpoints.down("md")]: {
        display: "none",
      },
    },
    buttonMobile: {
      textAlign: "right",
      marginTop: "5px",
      [theme.breakpoints.up("lg")]: {
        display: "none",
      },
    },
  }));
