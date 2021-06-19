import Components from "components/index";
import Labels from "labels/index";
import Style from "./style";

export default (props) => {
  const classes = Style({ size: 125 })();
  return (
    <img
      src={Labels.images.hdcircle}
      className={`${classes.root} ${classes.rotating}`}
    />
  );
};
