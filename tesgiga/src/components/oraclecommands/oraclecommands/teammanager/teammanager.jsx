import React from "react";
import Components from "components/index";
import { Grid } from "@material-ui/core";
import _GlobalActions from "globalactions/index";
import Utils from "../../_utils";
import Style from "./style";

const GlobalActions = _GlobalActions("admin");

export default (props) => {
  const classes = Style();
  const [state, setState] = React.useState({
    radioValue: "Divinity League",
    editing: "Off",
    team: null,
  });
  React.useEffect(async () => {
    const logos = await GlobalActions.Requests.getTeamLogos();
  }, []);
  const Card = (props) => {
    return (
      <Grid container>
        <Grid item xs={2}>
          <Components.InteractiveCard
            invertColor
            onClick={() =>
              setState((lastState) => ({
                ...lastState,
                team: props.team
                  ? props.team
                  : {
                      name: "New Team",
                    },
              }))
            }
          >
            <div className={classes.card}>
              {props.team ? (
                <Components.FontAwesome icon={"faPlusSquare"} />
              ) : (
                <Components.FontAwesome icon={"faPlusSquare"} />
              )}
            </div>
          </Components.InteractiveCard>
        </Grid>
      </Grid>
    );
  };
  return (
    <React.Fragment>
      <Utils.Document
        title={"Teams"}
        description={"Create, edit, or delete a team."}
        validate={() => null}
      >
        <div className={classes.editRadio}>
          <Components.Typography>Enable Editing</Components.Typography>
          <Components.RadioButton
            value={state.editing}
            items={["On", "Off"]}
            row
            onChange={(editing) =>
              setState((lastState) => ({
                ...lastState,
                editing,
              }))
            }
          />
        </div>
        <Components.RadioButton
          value={state.radioValue}
          items={["Divinity League", "Conqueror's League"]}
          row
          onChange={(radioValue) =>
            setState((lastState) => ({ ...lastState, radioValue }))
          }
        />
        <Card />
      </Utils.Document>
      {state.team ? (
        <Utils.Document
          title={
            state.editing === "On" ? (
              <Components.TextField
                invertColor
                label={"Team Name"}
                value={state.team.name}
                onChange={(e) => {
                  const team = state.team;
                  team.name = e;
                  setState((lastState) => ({ ...lastState, team }));
                }}
              />
            ) : (
              state.team.name
            )
          }
          validate={() => null}
        >
          <div className={classes.roster}>
            <Components.Typography>Set Roster</Components.Typography>
            <Components.Transferlist
              disableAllTransferRight
              itemsLeft={["Jetgorilla", "Braer", "Khyroe", "Phortwenty"]}
              itemsRight={["Major", "Germ", "Sammy", "Mute", "ZER0BII"]}
            />
          </div>
        </Utils.Document>
      ) : null}
    </React.Fragment>
  );
};
