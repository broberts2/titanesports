import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: { backgroundColor: theme.palette.background.default },
  cardBody: {
    width: "100%",
    height: "300px",
    [theme.breakpoints.down("sm")]: {
      height: "200px",
    },
    position: "relative",
    textAlign: "center",
    marginBottom: "15px",
    marginTop: "-10px",
    borderRadius: "4px",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    position: "absolute",
    top: 0,
    left: 0,
    opacity: 0.25,
    height: "100%",
    width: "100%",
    objectFit: "cover",
    borderRadius: "6px",
  },
  newArticleButton: {
    zIndex: 1499,
    position: "absolute",
    top: "100px",
    right: 0,
  },
  cardImgIcon: {
    height: "50%",
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  tag: {
    height: "25%",
  },
}));
