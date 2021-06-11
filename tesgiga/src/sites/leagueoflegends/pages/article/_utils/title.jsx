import React from "react";
import Components from "components/index";
import fns from "./fns";
import Style from "../style";

export default (props) => {
  const classes = Style();
  const [state, setState] = React.useState({ editing: false });
  return (
    <Components.Typography className={classes.title}>
      {state.editing ? (
        <Components.TextField
          value={props.state.article.title}
          onChange={(title) => {
            const newState = props.state;
            newState.article.title = title;
            props.cb(newState);
          }}
        />
      ) : (
        props.state.article.title
      )}
      {props.state.editing ? (
        <Components.Box display="flex" flexDirection="row-reverse">
          <Components.PrimaryButton
            onClick={() => fns.insertBlock(props.state, -1, props.cb)}
          >
            Insert Block
          </Components.PrimaryButton>
          <Components.PrimaryButton
            onClick={() => setState({ editing: !state.editing })}
          >
            {state.editing ? "Preview" : "Edit Title"}
          </Components.PrimaryButton>
        </Components.Box>
      ) : null}
    </Components.Typography>
  );
};
