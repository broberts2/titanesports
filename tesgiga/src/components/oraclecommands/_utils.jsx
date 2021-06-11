import React from "react";
import Components from "components/index";
import Style from "./style";

const Document = (props) => {
  const classes = Style();
  const [snack, setSnack] = React.useState({});
  const [sending, setSending] = React.useState(false);
  return (
    <Components.InteractiveCard>
      <div
        className={classes.document}
        style={{ pointerEvents: sending ? "none" : "" }}
      >
        <Components.Typography variant="h4">
          {props.title}
        </Components.Typography>
        <Components.Typography>{props.description}</Components.Typography>
        {props.children}
        <Components.PrimaryButton
          onClick={async () => {
            if (props.validate()) {
              if (window.confirm("Are you sure?")) {
                setSending(true);
                const res = await props.onSubmit();
                setSnack({
                  severity: "success",
                  open: true,
                  message: "Operation successful",
                });
                setSending(false);
              }
            } else {
              setSnack({
                severity: "warning",
                open: true,
                message: "Please fill all required form fields",
              });
            }
          }}
        >
          Submit
        </Components.PrimaryButton>
        <div
          className={classes.miniLoader}
          style={{ display: sending ? "" : "none" }}
        >
          <Components.CircularProgress style={{ color: "red" }} size={120} />
        </div>
        <Components.Snack
          severity={snack.severity}
          close={() => {
            setSnack({ ...snack, open: false });
          }}
          open={snack.open}
        >
          {snack.message}
        </Components.Snack>
      </div>
    </Components.InteractiveCard>
  );
};

export default {
  Document,
};
