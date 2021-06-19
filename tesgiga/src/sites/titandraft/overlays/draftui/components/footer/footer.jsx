import Components from "components/index";
import DraftComponents from "../index";
import Labels from "labels/index";
import Style from "./style";

export default (props) => {
  const classes = Style();
  return (
    <Components.Grid container className={classes.root}>
      <Components.Grid
        item
        xs={5}
        style={{ marginLeft: "7.5px", marginRight: "-7.55px" }}
      >
        <DraftComponents.BanRow
          items={props.state.blueteam.bancard}
          skew={-22.5}
        />
      </Components.Grid>
      <Components.Grid item xs={2}>
        <DraftComponents.ActionButton
          onClick={() => null}
          text={"Do an action"}
        />
      </Components.Grid>
      <Components.Grid item xs={5}>
        <DraftComponents.BanRow
          items={props.state.redteam.bancard}
          reverse
          skew={22.5}
        />
      </Components.Grid>
    </Components.Grid>
  );
};
