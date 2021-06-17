import React from "react";
import Components from "components/index";
import { Grid } from "@material-ui/core";
import _GlobalActions from "globalactions/index";
import Utils from "../../_utils";
import Style from "./style";

const GlobalActions = _GlobalActions("admin");
const GlobalActionsLeagueOfLegends = _GlobalActions("leagueoflegends");

const map = {
  "Top Lane": "memberTopId",
  Jungle: "memberJungleId",
  "Mid Lane": "memberMidId",
  "Bot Lane": "memberBottomId",
  Support: "memberSupportId",
  "Top Lane": "memberTopId",
};

export default (props) => {
  const classes = Style();
  const [state, setState] = React.useState({
    radioValue: "Divinity League",
    editing: "On",
    itemsLeft: [],
    subs: {
      0: "",
      1: "",
      2: "",
    },
  });
  React.useEffect(async () => {
    const teams = {};
    const players = { fwd: {}, rev: {} };
    const logos = await GlobalActions.Requests.getTeamLogos();
    await GlobalActions.Requests.getUsers({
      summonerId: { $ne: null },
    })
      .then((res) => (Array.isArray(res) ? res : [res]))
      .then((res) =>
        res.map((el) => {
          players.fwd[el.discordId] = el;
          players.rev[el.displayname] = el;
        })
      );
    await GlobalActionsLeagueOfLegends.Requests.getTeams().then((res) =>
      res.map((el) => (teams[el.name] = el))
    );
    teams["<new team>"] = {
      name: "",
      roster: [],
      isNew: true,
    };
    setState((lastState) => ({
      ...lastState,
      players,
      teams,
      logos,
      itemsLeft: [],
    }));
  }, []);
  return (
    <div style={{ display: "flex", flexFlow: "column", height: "100%" }}>
      <div style={{ flex: "0 1 auto" }}>
        <Utils.Document
          title={"Teams"}
          description={"Create, edit, or delete a team."}
          validate={() => null}
        >
          <div className={classes.editRadio} style={{ display: "none" }}>
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
            items={["Divinity League", "Conqueror League"]}
            row
            onChange={(radioValue) =>
              setState((lastState) => ({ ...lastState, radioValue }))
            }
          />
          <Components.Typography>Select a Team</Components.Typography>
          {state.teams ? (
            <Components.RadioButton
              row
              value={state.team}
              items={Object.keys(state.teams)}
              onChange={(team) => {
                const subs = state.subs;
                if (state.teams[team].subsIds) {
                  state.teams[team].subsIds.map(
                    (value, i) => (subs[i] = value)
                  );
                }
                setState((lastState) => ({
                  ...lastState,
                  itemsLeft: Object.keys(state.players.fwd).filter((id) =>
                    !state.teams[team].roster.includes(id)
                      ? state.players.fwd[id]
                      : null
                  ),
                  logo:
                    state.teams[team] && state.teams[team].logo
                      ? state.teams[team].logo
                      : null,
                  subs,
                  team,
                }));
              }}
            />
          ) : null}
        </Utils.Document>
      </div>
      {state.team ? (
        <div style={{ flex: "1 1 auto", overflowY: "auto" }}>
          <Utils.Document
            title={
              state.editing === "On" ? (
                <Components.TextField
                  invertColor
                  label={"Team Name"}
                  value={state.teams[state.team].name}
                  onChange={(e) => {
                    const teams = state.teams;
                    state.teams[state.team].name = e;
                    setState((lastState) => ({ ...lastState, teams }));
                  }}
                />
              ) : (
                state.team
              )
            }
            onCreate={
              state.teams[state.team].isNew
                ? async () => {
                    const response = await GlobalActionsLeagueOfLegends.Requests.createTeam(
                      Object.assign(state.teams[state.team], {
                        league: state.radioValue,
                        subsIds: Object.values(state.subs).filter((el) =>
                          el && el.length > 0 ? el : null
                        ),
                      })
                    );
                  }
                : null
            }
            onSubmit={
              !state.teams[state.team].isNew
                ? async () => {
                    const response = await GlobalActionsLeagueOfLegends.Requests.updateTeam(
                      Object.assign(state.teams[state.team], {
                        league: state.radioValue,
                        subsIds: Object.values(state.subs).filter((el) =>
                          el && el.length > 0 ? el : null
                        ),
                      })
                    );
                  }
                : null
            }
            onDelete={
              !state.teams[state.team].isNew
                ? async () => {
                    const response = await GlobalActionsLeagueOfLegends.Requests.deleteTeam(
                      state.teams[state.team]
                    );
                  }
                : null
            }
            validate={() => true}
          >
            <div>
              <Components.Typography>Team Logo</Components.Typography>
              {state.logos ? (
                <Components.RadioButton
                  row
                  value={state.logo}
                  items={state.logos}
                  onChange={(logo) => {
                    const teams = state.teams;
                    teams[state.team].logo = logo;
                    setState((lastState) => ({ ...lastState, teams, logo }));
                  }}
                />
              ) : null}
              <div className={classes.roster}>
                <Components.Typography>Set Roster</Components.Typography>
                <Components.Transferlist
                  trigger={state.team}
                  disableAllTransferRight
                  itemsLeft={state.itemsLeft.map(
                    (el) => state.players.fwd[el].displayname
                  )}
                  itemsRight={state.teams[state.team].roster.map(
                    (id) => state.players.fwd[id].displayname
                  )}
                  onChange={(itemsLeft, itemsRight) => {
                    const teams = state.teams;
                    teams[state.team].roster = itemsRight.map(
                      (displayname) => state.players.rev[displayname].discordId
                    );
                    setState((lastState) => ({ ...lastState, teams }));
                  }}
                />
              </div>
              {Object.keys(map).map((el) => (
                <Components.Picklist
                  onChange={(e) => {
                    const teams = state.teams;
                    teams[state.team][map[el]] = state.players.rev[e].discordId;
                    setState((lastState) => ({ ...lastState, teams }));
                  }}
                  allowNone
                  invertColor
                  items={state.teams[state.team].roster.map(
                    (id) => state.players.fwd[id].displayname
                  )}
                  value={
                    state.players.fwd[state.teams[state.team][map[el]]]
                      ? state.players.fwd[state.teams[state.team][map[el]]]
                          .displayname
                      : null
                  }
                  helpText={el}
                />
              ))}
              {Object.keys(state.subs).map((key) => (
                <Components.Picklist
                  onChange={(reqSub) => {
                    const subs = state.subs;
                    subs[key] = state.players.rev[reqSub].discordId;
                    setState((lastState) => ({ ...lastState, subs }));
                  }}
                  allowNone
                  invertColor
                  items={state.teams[state.team].roster.map(
                    (id) => state.players.fwd[id].displayname
                  )}
                  value={
                    state.players.fwd[state.subs[key]]
                      ? state.players.fwd[state.subs[key]].displayname
                      : null
                  }
                  helpText={"Sub"}
                />
              ))}
            </div>
          </Utils.Document>
        </div>
      ) : null}
    </div>
  );
};
