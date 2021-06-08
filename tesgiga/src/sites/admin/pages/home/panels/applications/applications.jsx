import { Box } from "@material-ui/core";
import React from "react";
import ArrowForwardRoundedIcon from "@material-ui/icons/ArrowForwardRounded";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import Components from "../../../../../../components/components";
import _GlobalActions from "../../../../../../globalactions/index";
import Style from "./style";
import Labels from "../../../../../../labels";

const GlobalActions = _GlobalActions("admin");

const RenderForm = (props) => {
  const Component = Components.Form[props.component];
  return <Component data={props.applications[props.index].JSON} />;
};

export default (props) => {
  const classes = Style();
  const [state, setState] = React.useState({
    applications: [],
    index: 0,
    snack: {
      open: false,
      severity: null,
      message: null,
    },
  });
  const getApps = async () => {
    const res = await GlobalActions.Requests.getApplications(
      props.callout
    ).then((res) =>
      res.result.map((el) => ({ JSON: JSON.parse(el.JSON), id: el._id }))
    );
    setState((lastState) => ({ ...lastState, applications: res, index: 0 }));
  };
  React.useEffect(() => {
    getApps();
  }, [props.callout]);
  return (
    <div className={classes.root}>
      <div
        className={classes.close}
        style={{ display: state.applications.length < 1 ? "none" : "" }}
      >
        <Components.Fab
          onClick={async () => {
            if (window.confirm("Delete Document?")) {
              const res = await GlobalActions.Requests.deleteApplication(
                state.applications[state.index].id
              );
              setState((lastState) => ({
                ...lastState,
                snack: {
                  open: true,
                  severity: res.code === 200 ? "success" : "error",
                  message:
                    res.code === 200
                      ? "Operation successful"
                      : "There was a problem",
                },
              }));
              getApps();
            }
          }}
        >
          <CloseRoundedIcon fontSize="large" />
        </Components.Fab>
      </div>
      <Box display="flex" width={"100%"} height={"100%"}>
        <Box
          m="auto"
          style={{
            overflowY: state.applications.length > 0 ? "scroll" : "hidden",
            overflowX: "hidden",
          }}
          height={"100%"}
        >
          {state.applications.length > 0 ? (
            RenderForm({
              component: props.component,
              applications: state.applications,
              slideDirection: "left",
              index: state.index,
            })
          ) : (
            <Box display="flex" width={"100%"} height={"100%"}>
              <Box m="auto">
                <img className={classes.poro} src={Labels.images.poro} />
              </Box>
            </Box>
          )}
          <Box
            className={classes.fabs}
            style={{ display: state.applications.length < 1 ? "none" : "" }}
          >
            <Box display="flex">
              <div
                className={classes.subfabs}
                style={{ opacity: state.index > 0 ? 1 : 0.3 }}
              >
                <Components.Fab
                  onClick={() => {
                    if (state.index > 0) {
                      setState((lastState) => ({
                        ...lastState,
                        index: state.index - 1,
                      }));
                    }
                  }}
                >
                  <ArrowBackRoundedIcon fontSize="large" />
                </Components.Fab>
              </div>
              <div
                className={classes.subfabs}
                style={{
                  opacity:
                    state.index < state.applications.length - 1 ? 1 : 0.3,
                }}
              >
                <Components.Fab
                  onClick={() => {
                    if (state.index < state.applications.length - 1) {
                      setState((lastState) => ({
                        ...lastState,
                        index: state.index + 1,
                      }));
                    }
                  }}
                >
                  <ArrowForwardRoundedIcon fontSize="large" />
                </Components.Fab>
              </div>
            </Box>
          </Box>
        </Box>
      </Box>
      <Components.Snack
        severity={state.snack.severity}
        close={() =>
          setState((lastState) => ({
            ...lastState,
            snack: { ...state.snack, open: false },
          }))
        }
        open={state.snack.open}
      >
        {state.snack.message}
      </Components.Snack>
    </div>
  );
};
