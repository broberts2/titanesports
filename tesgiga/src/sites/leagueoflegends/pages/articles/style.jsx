import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: { backgroundColor: theme.palette.background.default },
  cardBody: {
    width: "100%",
    height: "100%",
    position: "relative",
    textAlign: "center",
  },
  content: {
    position: "absolute",
    textAlign: "left",
    padding: "15px",
    height: "100%",
    width: "100%",
    top: 0,
    left: 0,
  },
  gridItem: {},
  typography6: {
    fontWeight: 800,
    fontStyle: "italic",
  },
  author: {
    position: "absolute",
    padding: "15px",
    bottom: 0,
    left: 0,
  },
  cardImg: {
    opacity: 0.25,
    width: "100%",
    borderRadius: "6px",
  },
  cardImgIcon: {
    height: "80%",
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  tag: {
    height: "25%",
  },
}));
