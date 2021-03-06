import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    width: "100%",
    overflowX: "hidden",
  },
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
  author: {
    marginRight: "50px",
    [theme.breakpoints.down("sm")]: {
      marginRight: "25px",
      fontSize: `calc(${theme.typography.h4.fontSize}/1.25)`,
    },
  },
  block: {
    marginTop: "20px",
    marginBottom: "20px",
    padding: "10px",
  },
  tagsWrapper: {
    position: "relative",
  },
  tags: {
    position: "absolute",
    right: 0,
    top: "-250px",
    "& img": {
      width: "150px",
      margin: "-25px",
    },
    [theme.breakpoints.down("sm")]: {
      top: "-100px",
      "& img": {
        width: "50px",
        margin: "-15px",
      },
    },
  },
  miniloader: {
    pointerEvents: "none",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  editBannerButton: {
    position: "absolute",
    zIndex: 1400,
    [theme.breakpoints.down("sm")]: {
      top: "200px",
    },
  },
}));
