import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    width: "100vw",
    height: "100vh",
  },
  listitem: {
    marginRight: "5px",
  },
  displayName: {
    padding: "20px",
    position: "absolute",
    right: 0,
  },
  content: {
    height: "100%",
    paddingLeft: "362.5px",
  },
  innercontent: {
    overflowY: "auto",
    width: "calc(100% - 200px)",
    height: "calc(100% - 200px)",
  },
}));
