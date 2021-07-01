import { TextField } from "@material-ui/core";
import React from "react";
import Style from "./style";

export default (props) => {
  const classes = Style(props)();
  return (
    <form className={classes.root} noValidate autoComplete="false">
      <TextField
        onKeyDown={(e) => {
          if (e.key === "Tab" && props.multiline) {
            document.execCommand("insertText", false, "\t");
            e.preventDefault();
            return false;
          } else if (e.key === "Enter" && !props.multiline) {
            if (props.onEnter) {
              props.onEnter();
            }
            e.preventDefault();
          }
        }}
        multiline={props.multiline}
        rows={props.rows ? props.rows : 10}
        style={{ width: "100%" }}
        value={props.value}
        InputProps={{
          classes: {
            input: classes.inputProps,
          },
        }}
        InputLabelProps={{
          style: {
            color: "inherit",
          },
        }}
        onChange={(e) =>
          props.onChange ? props.onChange(e.target.value) : null
        }
        label={props.label}
      />
    </form>
  );
};
