import { makeStyles } from "@material-ui/core/styles";

export default (props) =>
  makeStyles((theme) => ({
    root: {
      position: "relative",
      width: "100%",
      height: "600px",
      borderBottom: "3px solid black",
      marginBottom: "250px",
      [theme.breakpoints.down("sm")]: {
        height: "200px",
        borderBottom: "1px solid black",
        marginBottom: "100px",
      },
    },
    background: {
      overflow: "hidden",
      display: "flex",
      justifyContent: "center",
      alignItems: props.top
        ? "flex-start"
        : props.bottom
        ? "flex-end"
        : "center",
      width: "100%",
      height: "100%",
      "& img": {
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
    },
    icon: {
      position: "absolute",
      top: "100%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      "& img": {
        width: "350px",
        [theme.breakpoints.down("sm")]: {
          width: "150px",
        },
      },
    },
  }));
