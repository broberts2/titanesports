import React from "react";
import Style from "./style";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Components from "components/index";

const not = (a, b) => {
  return a.filter((value) => b.indexOf(value) === -1);
};

const intersection = (a, b) => {
  return a.filter((value) => b.indexOf(value) !== -1);
};

export default (props) => {
  const classes = Style();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(props.itemsLeft);
  const [right, setRight] = React.useState(props.itemsRight);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
    if (props.onChange) props.onChange(left, right);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
    if (props.onChange) props.onChange(left, right);
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
    if (props.onChange) props.onChange(left, right);
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
    if (props.onChange) props.onChange(left, right);
  };

  const customList = (items) => (
    <div className={classes.list}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;
          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
              className={classes.item}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </div>
  );

  return (
    <Grid
      container
      spacing={2}
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid item style={{ height: "100%", width: "33%" }}>
        <Components.Typography>Player Pool</Components.Typography>
        {customList(left)}
      </Grid>
      <Grid item style={{ height: "100%", width: "33%" }}>
        <Grid container direction="column" alignItems="center">
          <Components.PrimaryButton
            style={
              props.disableAllTransferRight
                ? { pointerEvents: "none", opacity: 0.35 }
                : {}
            }
            onClick={handleAllRight}
          >
            ≫
          </Components.PrimaryButton>
          <Components.PrimaryButton onClick={handleCheckedRight}>
            &gt;
          </Components.PrimaryButton>
          <Components.PrimaryButton onClick={handleCheckedLeft}>
            &lt;
          </Components.PrimaryButton>
          <Components.PrimaryButton
            style={
              props.disableAllTransferLeft
                ? { pointerEvents: "none", opacity: 0.35 }
                : {}
            }
            onClick={handleAllLeft}
          >
            ≪
          </Components.PrimaryButton>
        </Grid>
      </Grid>
      <Grid item style={{ height: "100%", width: "33%" }}>
        <Components.Typography>Available Roster</Components.Typography>
        {customList(right)}
      </Grid>
    </Grid>
  );
};
