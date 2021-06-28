import React from "react";
import DraftComponents from "./components/index";
import Components from "components/index";
import Labels from "labels/index";
import Style from "./style";
import ___ from "../../actions/index";
import _events from "../../events/index";
import _ from "../../state/index";
import automate from "./automate";

export default (props) => {
  const classes = Style();
  const [state, __] = React.useState(_);
  const [ChampionData, setChampionData] = React.useState(null);
  const [SingleChampionData, setSingleChampionData] = React.useState(null);
  const [nextAction, setNextAction] = React.useState(null);
  const actions = ___(state, __);
  const [actionId, setActionId] = React.useState(null);
  const events = _events(state, __);
  React.useEffect(() => {
    if (!props.replay) {
      props.socket.on("broadcast", (data) => {
        events.broadcast(data, setActionId, props);
      });
      props.socket.on("whisper", (data) => events.whisper(data, props));
      props.socket.on("sendchampiondata", (ChampionData) =>
        events.sendchampiondata(ChampionData, setChampionData)
      );
      props.socket.on("sendchampiondatasingle", (ChampionData) => {
        events.sendchampiondatasingle(ChampionData, setSingleChampionData);
      });
      props.socket.on("sendnextaction", (action) =>
        events.sendnextaction(action, setNextAction)
      );
      props.socket.on("broadcasttimer", (timer) =>
        events.broadcasttimer(timer)
      );
    } else if (props.replay !== "skip") {
      const _emp = { img: null, title: null, subtitle: null };
      ["blueteam", "redteam"].map((el) => {
        state[el].bancard = { 0: _emp, 1: _emp, 2: _emp, 3: _emp, 4: _emp };
        state[el].pickcard = { 0: _emp, 1: _emp, 2: _emp, 3: _emp, 4: _emp };
      });
      __(state);
      setSingleChampionData(null);
      setNextAction(null);
      setActionId(null);
      automate(events, state.history, props.replay);
    }
  }, [props.replay]);
  return (
    <div className={classes.root}>
      <div className={classes.innerroot}>
        <DraftComponents.HDCircle
          ChampionData={ChampionData}
          state={state}
          actions={actions}
        />
        <DraftComponents.Header
          ChampionData={ChampionData}
          state={state}
          actions={actions}
        />
        <DraftComponents.Body
          nextAction={nextAction}
          actionId={actionId}
          setActionId={(i) => setActionId(i)}
          ChampionData={ChampionData}
          SingleChampionData={SingleChampionData}
          state={state}
          access={props.access}
          actions={actions}
        />
        <DraftComponents.Footer
          nextAction={nextAction}
          socket={props.socket}
          actionId={actionId}
          ChampionData={ChampionData}
          state={state}
          actions={actions}
        />
      </div>
    </div>
  );
};
