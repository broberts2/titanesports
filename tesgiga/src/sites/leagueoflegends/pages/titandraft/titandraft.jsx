import React from "react";
import { ThemeProvider } from "@material-ui/core";
import { disablePageScroll, enablePageScroll } from "scroll-lock";
import _GlobalActions from "globalactions/index";
import Components from "components/index";
import Labels from "../../../../labels/index";
import config from "config";
import Style from "./style";

const GlobalActions = _GlobalActions("titandraft");

export default (props) => {
  const classes = Style();
  const [state, setState] = React.useState({ radioValue: "Elements" });
  const [snack, setSnack] = React.useState({
    message: "",
    severity: "",
    open: false,
  });
  const Block = (props) => {
    return (
      <Components.Grid container style={{ width: "100%" }}>
        <Components.Grid item xs={2} style={{ textAlign: "center" }}>
          <img src={Labels.images[props.img]} className={classes.subelement} />
        </Components.Grid>
        <Components.Grid
          item
          xs={10}
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (state[`l${props.i}`]) {
              navigator.clipboard.writeText(state[`l${props.i}`]);
              setSnack({
                message: "Copied to clipboard!",
                severity: "success",
                open: true,
              });
            }
          }}
        >
          <div style={{ pointerEvents: "none" }}>
            <Components.TextField
              value={state[`l${props.i}`]}
              label={
                props.team === "Observer"
                  ? "Observer Link"
                  : `${props.team} Captain's Link`
              }
            />
          </div>
        </Components.Grid>
      </Components.Grid>
    );
  };
  React.useEffect(() => props._());
  return (
    <ThemeProvider theme={Components.Themes.Dark}>
      <div
        className={classes.root}
        style={{ pointerEvents: state.building ? "none" : "" }}
      >
        <Components.Header cfg={"leagueoflegends"} setModal={props.setModal} />
        <Components.Ruby src={"faDragon"} />
        <Components.Blurb title={"Titan Draft"}>
          Welcome to the TES Titan draft. League of Legends does not allow
          players access to all champions (unless they have paid for them) in
          custom lobbies. A crucial part of competative League of Legends is the
          pick/ban phase where competitors take turns deciding what champions
          they will play as well as what champions the opposition cannot. This
          tool functions very similar to the widely popular 'Prodraft' utility,
          but with some additional quality of life changes and other TES server
          integrations.
        </Components.Blurb>
        <div className={classes.builder}>
          <Components.RadioButton
            row
            value={state.radioValue}
            onChange={(radioValue) =>
              setState((lastState) => ({ ...lastState, radioValue }))
            }
            label={"Mode"}
            items={["Elements"]}
          />
          <div style={{ display: !state.radioValue ? "none" : "" }}>
            <Components.Typography
              style={{
                display:
                  state.radioValue === "Tournament" ||
                  state.radioValue === "Exhibition" ||
                  !state.radioValue
                    ? "none"
                    : "",
              }}
            >
              You've selected Titan Draft - Elements! This mode is intened for
              general use drafting represented by Water (Blue) and Fire (Red) in
              tactical dominance.
            </Components.Typography>
            <Components.Typography
              style={{
                display:
                  state.radioValue === "Elements" ||
                  state.radioValue === "Tournament" ||
                  !state.radioValue
                    ? "none"
                    : "",
              }}
            >
              You've selected Titan Draft - Exhibition! This mode is intened for
              Titan Esports rostered teams who are looking for a simple draft
              without the need of a tournament code.
            </Components.Typography>
            <Components.Typography
              style={{
                display:
                  state.radioValue === "Elements" ||
                  state.radioValue === "Exhibition" ||
                  !state.radioValue
                    ? "none"
                    : "",
              }}
            >
              You've selected Titan Draft - Tournament! This mode is intened for
              Titan Esports rostered teams who are actively participating in a
              tournament match. Draft data will be submitted to Titan Esports
              upon completion.
            </Components.Typography>
            <div style={{ textAlign: "center" }}>
              <img src={Labels.images.water} className={classes.element} />
              <img src={Labels.images.fire} className={classes.element} />
            </div>
            {[
              { team: "Water", img: "water" },
              { team: "Fire", img: "fire" },
              { team: "Observer", img: "aery" },
            ].map((el, i) => (
              <Block team={el.team} img={el.img} i={i} />
            ))}
            <Components.PrimaryButton
              fill
              onClick={async () => {
                disablePageScroll();
                setState((lastState) => ({ ...lastState, building: true }));
                const draft = await GlobalActions.Requests.createDraft({
                  blueteam: { name: "Water", logo: "oceandrake" },
                  redteam: { name: "Fire", logo: "firedrake" },
                });
                setState((lastState) => ({ ...lastState, building: false }));
                if (draft.code === 200) {
                  const link = `${
                    config.production
                      ? `https://titandraft.titan-esports.org`
                      : `http://titandraft.localhost:3000`
                  }?lobby=${draft.result._id}`;
                  setState((lastState) => ({
                    ...lastState,
                    l0: `${link}&token=${draft.result.bluetoken}`,
                    l1: `${link}&token=${draft.result.redtoken}`,
                    l2: `${link}`,
                  }));
                }
                setSnack({
                  message:
                    draft.code === 200
                      ? "Operation Successful"
                      : "Operation failed",
                  severity: draft.code === 200 ? "success" : "error",
                  open: true,
                });
                enablePageScroll();
              }}
            >
              Build my draft!
            </Components.PrimaryButton>
          </div>
        </div>
        <div
          className={classes.loader}
          style={{ display: !state.building ? "none" : "" }}
        >
          <Components.CircularProgress size={160} />
        </div>
        <Components.Snack
          severity={snack.severity}
          close={() => {
            setSnack({ ...snack, open: false });
          }}
          open={snack.open}
        >
          {snack.message}
        </Components.Snack>
        <Components.Footer />
      </div>
    </ThemeProvider>
  );
};
