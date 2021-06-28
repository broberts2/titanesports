import React from "react";
import { ThemeProvider } from "@material-ui/core";
import Components from "components/index";
import GlobalActions from "globalactions/index";
import Labels from "labels/index";
import Overlays from "../../overlays/index";
import State from "../../state/index";
import Style from "./style";
import _events from "../../events/index";

const socket = require("socket.io-client")(
  require("config").production
    ? "https://titan-esports.org:7000"
    : "http://localhost:7000"
);
socket.emit("join", GlobalActions("titandraft").Utils.getUrlParameters());

export default (props) => {
  const classes = Style();
  const [state, setState] = React.useState({});
  const wait = async (n) => await new Promise((r) => setTimeout(() => r(), n));
  const events = _events(state, setState);
  React.useEffect(() => {
    socket.on("validate", (data) => {
      events.validate(data);
      props._();
    });
  }, []);
  socket.on("readycheck", (draft) => events.readycheck(draft));
  socket.on("broadcasttransition", () => {
    events.broadcasttransition(wait, props);
  });
  return (
    <ThemeProvider theme={Components.Themes.Dark}>
      <div className={classes.root}>
        <video
          src={Labels.backgroundvideos.background1}
          className={classes.bgVideo}
          autoPlay
          muted
          loop
        />
        <div style={{ display: state.draftUI ? "" : "none" }}>
          <Overlays.DraftUI
            replay={state.replay}
            access={state.access}
            socket={socket}
            transition={state.transition}
          />
        </div>
        {state.baddraft ? (
          <Overlays.BadDraft socket={socket} transition={state.transition} />
        ) : null}
        {state.lobby && !state.replay ? (
          <Overlays.Lobby
            broadcastTransition={(replay) =>
              events.broadcasttransition(wait, props, replay)
            }
            socket={socket}
            transition={state.transition}
          />
        ) : null}
        {state.readycheck ? (
          <Overlays.ReadyCheck
            access={state.access}
            draft={state.draft}
            socket={socket}
            transition={state.transition}
          />
        ) : null}
      </div>
    </ThemeProvider>
  );
};
