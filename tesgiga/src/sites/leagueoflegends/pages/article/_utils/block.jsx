import React from "react";
import { Box } from "@material-ui/core";
import Components from "components/index";
import fns from "./fns";
import Style from "../style";

export default (props) => {
  const classes = Style();
  const [state, setState] = React.useState({
    editing: false,
  });
  return (
    <Components.Typography className={classes.block}>
      {state.editing && props.state.editing ? (
        <Components.TextField
          value={props.state.article.contentblocks[props.n].title}
          onChange={(title) =>
            fns.editBlock(
              props.state,
              {
                title,
                content: props.state.article.contentblocks[props.n].content,
              },
              props.n,
              props.cb
            )
          }
        />
      ) : (
        <div
          className={classes.blockTitle}
          dangerouslySetInnerHTML={{
            __html: props.state.article.contentblocks[props.n].title,
          }}
        />
      )}
      {state.editing && props.state.editing ? (
        <Components.TextField
          multiline
          rows={20}
          value={props.state.article.contentblocks[props.n].content}
          onChange={(content) =>
            fns.editBlock(
              props.state,
              {
                title: props.state.article.contentblocks[props.n].title,
                content,
              },
              props.n,
              props.cb
            )
          }
        />
      ) : (
        <div
          className={classes.blockText}
          dangerouslySetInnerHTML={{
            __html: props.state.article.contentblocks[props.n].content,
          }}
        />
      )}
      {props.state.editing ? (
        <Box display="flex" flexDirection="row-reverse">
          {!state.editing ? (
            <Components.PrimaryButton
              onClick={() => fns.dropBlock(props.state, props.n, props.cb)}
            >
              Drop Block
            </Components.PrimaryButton>
          ) : null}
          {!state.editing ? (
            <Components.PrimaryButton
              onClick={() => fns.insertBlock(props.state, props.n, props.cb)}
            >
              Insert Block
            </Components.PrimaryButton>
          ) : null}
          <Components.PrimaryButton
            onClick={() =>
              setState((lastState) => ({
                editing: !lastState.editing,
              }))
            }
          >
            {state.editing ? "Preview" : "Edit Block"}
          </Components.PrimaryButton>
        </Box>
      ) : null}
    </Components.Typography>
  );
};
