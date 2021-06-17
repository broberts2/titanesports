import React from "react";
import Components from "components/index";
import { Grid } from "@material-ui/core";
import _GlobalActions from "globalactions/index";
import Utils from "../../_utils";
import Style from "./style";

const GlobalActions = _GlobalActions("admin");
const GlobalActionsLeagueOfLegends = _GlobalActions("leagueoflegends");

export default (props) => {
  const classes = Style();
  const [state, setState] = React.useState({
    editing: "On",
    playerSearch: "",
    verifiedOnly: "Off",
    users: [],
  });
  const filterUsers = (userList) => {
    return Object.values(userList)
      .filter((el) =>
        state.playerSearch.length > 0
          ? el.displayname
              .toLowerCase()
              .includes(state.playerSearch.toLowerCase())
            ? el
            : null
          : el
      )
      .filter((el) =>
        state.verifiedOnly === "On" ? (el.summonerId ? el : null) : el
      );
  };
  React.useEffect(async () => {
    const userList = await GlobalActions.Requests.getUsers().then((arr) => {
      const obj = {};
      arr.map((el) => (obj[el.displayname] = el));
      return obj;
    });
    setState((lastState) => ({
      ...lastState,
      userList,
      users: filterUsers(userList),
    }));
  }, []);
  return (
    <div style={{ display: "flex", flexFlow: "column", height: "100%" }}>
      <div style={{ flex: "0 1 auto" }}>
        <Utils.Document
          title={"Players"}
          description={"Create, edit, or delete a player."}
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
          <Components.TextField
            invertColor
            label={"Search Filter"}
            value={state.playerSearch}
            onChange={(playerSearch) =>
              setState((lastState) => ({ ...lastState, playerSearch }))
            }
          />
          <Components.Typography>
            Limit search to verified members only
          </Components.Typography>
          <Components.RadioButton
            value={state.verifiedOnly}
            items={["On", "Off"]}
            row
            onChange={(verifiedOnly) =>
              setState((lastState) => ({
                ...lastState,
                verifiedOnly,
              }))
            }
          />
          <br />
          <Components.PrimaryButton
            onClick={() =>
              setState((lastState) => ({
                ...lastState,
                users: filterUsers(state.userList),
              }))
            }
          >
            Search
          </Components.PrimaryButton>
          <br />
          <div className={classes.players}>
            <Components.RadioButton
              value={state.selectedPlayer}
              items={state.users.map((el) => el.displayname)}
              row
              onChange={(selectedPlayer) =>
                setState((lastState) => ({ ...lastState, selectedPlayer }))
              }
            />
          </div>
        </Utils.Document>
      </div>
      {state.selectedPlayer ? (
        <div
          style={{
            flex: "1 1 auto",
            overflowY: "auto",
          }}
        >
          <Utils.Document
            title={state.selectedPlayer}
            description={"Manage"}
            onSubmit={async () => {
              const response = await GlobalActions.Requests.updateUser(
                state.userList[state.selectedPlayer]
              );
              console.log(response);
            }}
          >
            <Components.TextField
              invertColor
              label={"SummonerName"}
              value={
                state.userList[state.selectedPlayer].summonerName
                  ? state.userList[state.selectedPlayer].summonerName
                  : ""
              }
              onChange={(e) => {
                const userList = state.userList;
                userList[state.selectedPlayer].summonerName = e;
                setState((lastState) => ({ ...lastState, userList }));
              }}
            />
            <Components.TextField
              invertColor
              label={"Summoner Id"}
              value={
                state.userList[state.selectedPlayer].summonerId
                  ? state.userList[state.selectedPlayer].summonerId
                  : ""
              }
            />
            <Components.TextField
              invertColor
              label={"Tournament Id"}
              value={
                state.userList[state.selectedPlayer].tournamentId
                  ? state.userList[state.selectedPlayer].tournamentId
                  : ""
              }
            />
            <Components.PrimaryButton
              onClick={async (myProps) => {
                myProps.setSending(true);
                const verified = await GlobalActionsLeagueOfLegends.Requests.verifyBySummonerName(
                  state.userList[state.selectedPlayer].summonerName !==
                    undefined
                    ? state.userList[state.selectedPlayer].summonerName
                    : ""
                );
                if (verified.id) {
                  const userList = state.userList;
                  userList[state.selectedPlayer].summonerName = verified.name;
                  userList[state.selectedPlayer].summonerId = verified.id;
                  setState((lastState) => ({ ...lastState, userList }));
                  myProps.setSnack({
                    severity: "success",
                    open: true,
                    message: "Summoner verified",
                  });
                } else if (verified.status) {
                  myProps.setSnack({
                    severity: "warning",
                    open: true,
                    message: verified.status.message,
                  });
                }
                myProps.setSending(false);
              }}
            >
              Verify Summoner Name
            </Components.PrimaryButton>
            <Components.PrimaryButton
              style={
                state.userList[state.selectedPlayer].summonerId &&
                state.userList[state.selectedPlayer].summonerId.length > 0
                  ? {}
                  : { opacity: 0.35, pointerEvents: "none" }
              }
              onClick={async (myProps) => {
                myProps.setSending(true);
                const verified = await GlobalActionsLeagueOfLegends.Requests.verifyBySummonerId(
                  state.userList[state.selectedPlayer].summonerId
                );
                if (verified.id) {
                  const userList = state.userList;
                  userList[state.selectedPlayer].summonerName = verified.name;
                  userList[state.selectedPlayer].summonerId = verified.id;
                  setState((lastState) => ({ ...lastState, userList }));
                  myProps.setSnack({
                    severity: "success",
                    open: true,
                    message: "Summoner verified",
                  });
                } else if (verified.status) {
                  myProps.setSnack({
                    severity: "warning",
                    open: true,
                    message: verified.status.message,
                  });
                }
                myProps.setSending(false);
              }}
            >
              Update By Summoner Id
            </Components.PrimaryButton>
            <Components.PrimaryButton
              style={
                state.userList[state.selectedPlayer].summonerId &&
                state.userList[state.selectedPlayer].summonerId.length > 0
                  ? {}
                  : { opacity: 0.35, pointerEvents: "none" }
              }
              onClick={async (myProps) => {
                myProps.setSending(true);
                const userList = state.userList;
                userList[state.selectedPlayer].summonerId = null;
                setState((lastState) => ({ ...lastState, userList }));
                myProps.setSnack({
                  severity: "success",
                  open: true,
                  message: "Summoner un-verified",
                });
                myProps.setSending(false);
              }}
            >
              Un-verify
            </Components.PrimaryButton>
            <br />
          </Utils.Document>
        </div>
      ) : null}
    </div>
  );
};
