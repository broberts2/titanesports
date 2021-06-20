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
        <DraftComponents.PickRow
          nextAction={props.nextAction}
          team={"blueteam"}
          action={"pickcard"}
          bgvideo={"background4"}
          items={props.state.blueteam.pickcard}
          nullimg={"water"}
        />
      </Components.Grid>
      <Components.Grid
        item
        xs={6}
        style={{ maxHeight: "97.5%" }}
        container
        alignItems="flex-end"
        justify="center"
      >
        <DraftComponents.PickGrid
          actionId={props.actionId}
          ChampionData={props.ChampionData}
          setActionId={(i) => props.setActionId(i)}
          state={props.state}
        />
        <DraftComponents.Passive
          actionId={props.actionId}
          ChampionData={props.SingleChampionData}
          setActionId={(i) => props.setActionId(i)}
          state={props.state}
        />
      </Components.Grid>
      <Components.Grid item xs={3}>
        <DraftComponents.PickRow
          nextAction={props.nextAction}
          team={"redteam"}
          action={"pickcard"}
          bgvideo={"background2"}
          items={props.state.redteam.pickcard}
          nullimg={"fire"}
        />
      </Components.Grid>
    </Components.Grid>
  );
};
