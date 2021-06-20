import { makeStyles } from "@material-ui/core/styles";
import Labels from "labels/index";

const padding = 5;

export default (props) =>
  makeStyles((theme) => ({
    root: {
      width: "100%",
      height: "100%",
      marginLeft: `${props.skew < 0 ? `25px` : "-30px"}`,
    },
    item: {
      width: `calc(100% - ${padding * 2}px)`,
      height: `calc(100% - ${padding * 2}px)`,
      padding: `${padding}px`,
      backgroundColor: "#020a14",
      borderRadius: "4px",
      transform: `skew(${props.skew}deg)`,
      position: "relative",
      overflow: "hidden",
    },
    title: {
      position: "absolute",
      bottom: 0,
      left: `25%`,
      transform: `translateX(-25%)`,
      padding: "5px",
      transform: `skew(${-props.skew}deg)`,
    },
    notnull: {
      left: (props.skew > 0 ? -1 : 1) * props.skew,
      position: "absolute",
      width: `calc(150%)`,
      height: `calc(100% - ${padding * 2}px)`,
      objectFit: "cover",
      transform: `skew(${-props.skew}deg)`,
      opacity: 1,
    },
    null: {
      opacity: 1,
      position: "absolute",
      top: "37.5%",
      left: "37.5%",
      transform: "translate(-37.5%, -37.5%)",
      height: `25%`,
      transform: `skew(${-props.skew}deg)`,
    },
    bgvideo: {
      opacity: 0.75,
      position: "absolute",
      width: `calc(100% - 10px)`,
      height: `calc(100% - 10px)`,
      objectFit: "cover",
    },
  }));
