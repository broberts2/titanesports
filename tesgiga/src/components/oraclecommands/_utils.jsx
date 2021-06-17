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
        {props.children
          ? Array.isArray(props.children)
            ? props.children
                .filter((el) => (el ? el : null))
                .map((el) => React.cloneElement(el, { setSnack, setSending }))
            : React.cloneElement(props.children, { setSnack, setSending })
          : null}
        {props.onSubmit || props.onCreate ? (
          <React.Fragment>
            <Components.PrimaryButton
              onClick={async () => {
                if (!props.validate || props.validate()) {
                  if (window.confirm("Are you sure?")) {
                    setSending(true);
                    const res = props.onSubmit
                      ? await props.onSubmit()
                      : await props.onCreate();
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
              {props.onSubmit ? "Submit" : "Create"}
            </Components.PrimaryButton>
            {props.onDelete ? (
              <Components.PrimaryButton
                onClick={async () => {
                  if (!props.validate || props.validate()) {
                    if (window.confirm("Are you sure?")) {
                      setSending(true);
                      const res = await props.onDelete();
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
                Delete
              </Components.PrimaryButton>
            ) : null}
          </React.Fragment>
        ) : null}
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
