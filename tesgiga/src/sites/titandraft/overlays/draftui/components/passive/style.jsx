import { makeStyles } from "@material-ui/core/styles";
import Labels from "labels/index";

export default (props) =>
  makeStyles((theme) => ({
    root: {
      width: "100%",
      display:
        props.finisheddate ||
        props.state.access === props.state.draft.actingteam
          ? "none"
          : "",
    },
    championimg: {
      width: "100%",
      objectFit: "cover",
      borderRadius: "6px",
      border: "2px solid black",
    },
    spellimg: {
      width: "100%",
    },
  }));
