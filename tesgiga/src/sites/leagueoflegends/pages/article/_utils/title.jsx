import React from "react";
import Components from "components/index";
import Style from "../style";

export default (props) => {
  const classes = Style();
  const [state, setState] = React.useState({ editing: false });
  return (
    <Components.Typography className={classes.title}>
      {props.state.article.title}
      {props.state.editing ? (
        <Components.Box display="flex" flexDirection="row-reverse">
          <Components.PrimaryButton
            onClick={() =>
              setState((lastState) => ({
                ...lastState,
                editing: !lastState.editing,
              }))
            }
          >
            {state.editing ? "Preview" : "Insert Block"}
          </Components.PrimaryButton>
          <Components.PrimaryButton
            onClick={() =>
              setState((lastState) => ({
                ...lastState,
                editing: !lastState.editing,
              }))
            }
          >
            {state.editing ? "Preview" : "Edit Title"}
          </Components.PrimaryButton>
        </Components.Box>
      ) : null}
    </Components.Typography>
  );
};
