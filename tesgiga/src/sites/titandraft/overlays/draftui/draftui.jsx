import React from "react";
import DraftComponents from "./components/index";
import Components from "components/index";
import Labels from "labels/index";
import Style from "./style";
import ___ from "../../actions/index";
import _ from "../../state/index";

export default (props) => {
  const classes = Style();
  const [state, __] = React.useState(_);
  const [ChampionData, setChampionData] = React.useState(null);
  const [SingleChampionData, setSingleChampionData] = React.useState(null);
  const [nextAction, setNextAction] = React.useState(null);
  const actions = ___(state, __);
  const [actionId, setActionId] = React.useState(null);
  React.useEffect(() => {
    props.socket.on("broadcast", (data) => {
      if (data) {
        setActionId(null);
        __({ ...data, ...data.state, access: props.access });
      }
    });
    props.socket.on("whisper", (data) =>
      data ? __({ ...data, ...data.state, access: props.access }) : null
    );
    props.socket.on("sendchampiondata", (ChampionData) =>
      ChampionData ? setChampionData(ChampionData) : null
    );
    props.socket.on("sendchampiondatasingle", (ChampionData) =>
      ChampionData ? setSingleChampionData(ChampionData) : null
    );
    props.socket.on("sendnextaction", (action) => setNextAction(action));
    props.socket.on("broadcasttimer", (timer) =>
      __((lastState) => ({ ...lastState, timer }))
    );
  }, []);
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
