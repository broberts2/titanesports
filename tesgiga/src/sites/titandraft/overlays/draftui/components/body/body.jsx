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
        xs={3}
        style={{ marginLeft: "7.5px", marginRight: "-7.55px" }}
      >
        <DraftComponents.PickRow items={props.state.blueteam.pickcard} />
      </Components.Grid>
      <Components.Grid
        item
        xs={6}
        style={{ maxHeight: "97.5%" }}
        container
        alignItems="flex-end"
        justify="center"
      >
        <DraftComponents.PickGrid />
      </Components.Grid>
      <Components.Grid item xs={3}>
        <DraftComponents.PickRow items={props.state.redteam.pickcard} />
      </Components.Grid>
    </Components.Grid>
  );
};
