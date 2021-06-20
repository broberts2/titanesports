import React from "react";
import { ThemeProvider } from "@material-ui/core";
import Components from "components/index";
import GlobalActions from "globalactions/index";
import Labels from "labels/index";
import Overlays from "../../overlays/index";
import State from "../../state/index";
import Style from "./style";

const socket = require("socket.io-client")(
  require("config").production
    ? "https://titan-esports.org:7000"
    : "http://localhost:7000"
);
socket.emit("join", GlobalActions("titandraft").Utils.getUrlParameters());

export default (props) => {
  const classes = Style();
  const [state, setState] = React.useState({});
  React.useEffect(() => {
    socket.on("validate", (data) => {
      setState({
        access: data.access,
        baddraft: data.access === "noexist",
        draftUI: data.access !== "noexist",
      });
      props._();
    });
  }, []);
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
        {state.draftUI ? (
          <Overlays.DraftUI access={state.access} socket={socket} />
        ) : null}
        {state.baddraft ? <Overlays.BadDraft socket={socket} /> : null}
      </div>
    </ThemeProvider>
  );
};
