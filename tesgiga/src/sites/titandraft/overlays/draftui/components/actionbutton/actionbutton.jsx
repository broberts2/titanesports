import Components from "components/index";
import Labels from "labels/index";
import Style from "./style";

export default (props) => {
  const classes = Style(props)();
  return (
    <Components.PrimaryButton fill onClick={() => props.onClick()}>
      <Components.Typography variant="h5">{props.text}</Components.Typography>
    </Components.PrimaryButton>
  );
};
