import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Style from "./style";

export default (props) => {
  const classes = Style(props)();
  const [value, setValue] = React.useState(null);
  return (
    <FormControl className={classes.root}>
      {props.label ? (
        <InputLabel className={classes.label}>{props.label}</InputLabel>
      ) : null}
      <Select
        value={props.value ? props.value : value}
        classes={{
          select: classes.select,
        }}
        onChange={(e) => {
          setValue(e.target.value);
          if (props.onChange) props.onChange(e.target.value);
        }}
      >
        {props.allowNone ? (
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
        ) : null}
        {props.items.map((el) => (
          <MenuItem value={el}>{el}</MenuItem>
        ))}
      </Select>
      {props.helpText ? (
        <FormHelperText className={classes.label}>
          {props.helpText}
        </FormHelperText>
      ) : null}
    </FormControl>
  );
};
