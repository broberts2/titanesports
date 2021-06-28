import React from "react";
import Components from "components/index";
import Labels from "labels/index";
import Style from "./style";

import AnimationKeys from "./animationkeys";

export default (props) => {
  const classes = Style();
  return (
    <div className={classes.root}>
      <div className={classes.innerroot}>
        {props.draft.state.blueteam.ready ? (
          <AnimationKeys.Component
            comp={AnimationKeys.elements.blueready}
            dir={props.transition}
          >
            <div className={`${classes.readyribbon} ${classes.blue}`}>
              <video
                muted
                autoPlay
                loop
                src={Labels.backgroundvideos.background4}
                className={classes.video}
              />
              <Components.Typography variant="h4">Ready</Components.Typography>
            </div>
          </AnimationKeys.Component>
        ) : null}
        {props.draft.state.redteam.ready ? (
          <AnimationKeys.Component
            comp={AnimationKeys.elements.redready}
            dir={props.transition}
          >
            <div className={`${classes.readyribbon} ${classes.red}`}>
              <video
                muted
                autoPlay
                loop
                src={Labels.backgroundvideos.background2}
                className={classes.video}
              />
              <Components.Typography variant="h4">Ready</Components.Typography>
            </div>
          </AnimationKeys.Component>
        ) : null}
        <AnimationKeys.Component
          comp={AnimationKeys.elements.crown}
          dir={props.transition}
        >
          <img src={Labels.images.elements} className={classes.crown} />
        </AnimationKeys.Component>
        <Components.Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          className={classes.item}
        >
          <Components.Grid container style={{ width: "75%", height: "50%" }}>
            <Components.Grid item xs={4}>
              <Components.Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                style={{ height: "100%" }}
              >
                <AnimationKeys.Component
                  comp={AnimationKeys.elements.blueteam}
                  dir={props.transition}
                >
                  <div style={{ textAlign: "center" }}>
                    <img
                      src={Labels.images[props.draft.state.blueteam.logo]}
                      className={classes.tLogo}
                    />
                    <Components.Typography
                      variant="h2"
                      className={classes.teamname}
                    >
                      {props.draft.state.blueteam.name}
                    </Components.Typography>
                  </div>
                </AnimationKeys.Component>
              </Components.Box>
            </Components.Grid>
            <Components.Grid item xs={4}>
              <Components.Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                style={{ height: "100%" }}
              >
                <AnimationKeys.Component
                  comp={AnimationKeys.elements.vs}
                  dir={props.transition}
                >
                  <div className={classes.vs}>
                    <img src={Labels.images.vs} style={{ width: "50%" }} />
                  </div>
                </AnimationKeys.Component>
              </Components.Box>
            </Components.Grid>
            <Components.Grid item xs={4}>
              <Components.Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                style={{ height: "100%" }}
              >
                <AnimationKeys.Component
                  comp={AnimationKeys.elements.redteam}
                  dir={props.transition}
                >
                  <div style={{ textAlign: "center" }}>
                    <img
                      src={Labels.images[props.draft.state.redteam.logo]}
                      className={classes.tLogo}
                    />
                    <Components.Typography
                      variant="h2"
                      className={classes.teamname}
                    >
                      {props.draft.state.redteam.name}
                    </Components.Typography>
                  </div>
                </AnimationKeys.Component>
              </Components.Box>
            </Components.Grid>
          </Components.Grid>
        </Components.Box>
        <div
          style={{
            textAlign: "center",
            position: "absolute",
            bottom: "10%",
            width: "50%",
            left: "50%",
            transform: "translate(-50%, -10%)",
            display:
              props.access === "spectator" ||
              (props.access === "blueteam" &&
                props.draft.state.blueteam.ready) ||
              (props.access === "redteam" && props.draft.state.redteam.ready)
                ? "none"
                : "",
          }}
        >
          <AnimationKeys.Component
            comp={AnimationKeys.elements.readybutton}
            dir={props.transition}
          >
            <Components.Typography
              variant="h3"
              style={{ marginBottom: "25px" }}
            >
              Waiting for teams captains
            </Components.Typography>
            <Components.PrimaryButton
              fill
              onClick={() => props.socket.emit("readycheck", props.access)}
            >
              {props.access === "blueteam"
                ? "Blue Team Ready"
                : "Red Team Ready"}
            </Components.PrimaryButton>
          </AnimationKeys.Component>
        </div>
      </div>
    </div>
  );
};
