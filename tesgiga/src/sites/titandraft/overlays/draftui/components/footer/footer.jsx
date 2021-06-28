import Components from "components/index";
import DraftComponents from "../index";
import Labels from "labels/index";
import Style from "./style";
import _Actions from "../../../../actions/index";

export default (props) => {
  const classes = Style();
  const Actions = _Actions(props.socket);
  return (
    <Components.Grid container className={classes.root}>
      <Components.Grid
        item
        xs={5}
        style={{ marginLeft: "7.5px", marginRight: "-7.55px" }}
      >
        <DraftComponents.BanRow
          actingTeam={props.state.draft.actingteam}
          nextAction={props.nextAction}
          team={"blueteam"}
          action={"bancard"}
          bgvideo={"background4"}
          nullimg={"water"}
          items={props.state.blueteam.bancard}
          skew={-22.5}
        />
      </Components.Grid>
      <Components.Grid item xs={2}>
        {props.actionId && props.nextAction && props.state.starteddate ? (
          <DraftComponents.ActionButton
            onClick={() => Actions.banchampion(props.actionId)}
            text={`${props.nextAction.action === "bancard" ? "Ban" : "Pick"} ${
              props.ChampionData[props.actionId].name
            }`}
          />
        ) : null}
        <div
          className={classes.timer}
          style={{
            display:
              props.state.timer > 0 &&
              !props.state.finisheddate &&
              props.state.starteddate
                ? ""
                : "none",
          }}
        >
          <Components.Typography
            variant={props.actionId && props.nextAction ? "h4" : "h1"}
          >
            {props.state.timer}
          </Components.Typography>
        </div>
      </Components.Grid>
      <Components.Grid item xs={5}>
        <DraftComponents.BanRow
          nextAction={props.nextAction}
          team={"redteam"}
          action={"bancard"}
          bgvideo={"background2"}
          nullimg={"fire"}
          items={props.state.redteam.bancard}
          reverse
          skew={22.5}
        />
      </Components.Grid>
    </Components.Grid>
  );
};
