import { makeStyles } from "@material-ui/core/styles";
import Labels from "labels/index";

const padding = 5;

export default makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
  },
  item: {
    width: `calc(100% - ${padding * 2}px)`,
    height: `calc(100% - ${padding * 2}px)`,
    padding: `${padding}px`,
    backgroundColor: "#020a14",
    borderRadius: "4px",
    overflow: "hidden",
    position: "relative",
    "& img": {
      opacity: 1,
      position: "absolute",
      width: `calc(100% - ${padding * 2}px)`,
      height: `calc(100% - ${padding * 2}px)`,
      objectFit: "cover",
    },
  },
  title: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: "10px",
    fontSize: theme.typography.h5.fontSize,
    fontWeight: 800,
  },
  subtitle: { position: "absolute", bottom: 0, right: 0, padding: "10px" },
}));
