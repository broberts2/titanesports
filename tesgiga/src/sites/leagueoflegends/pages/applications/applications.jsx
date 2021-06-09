import React from "react";
import { ThemeProvider } from "@material-ui/core";
import Components from "components/index";
import Labels from "../../../../labels/index";
import Style from "./style";

const Forms = {
  divinity: {
    title: "Divinity League Application",
    component: Components.Form.TeamApplication_Divinity,
  },
  conquerors: {
    title: "Conqueror's League Application",
    component: Components.Form.TeamApplication_Conquerors,
  },
  staff: {
    title: "Staff Application",
    component: Components.Form.StaffApplication,
  },
  feedback: {
    title: "Community Feedback",
    component: Components.Form.Feedback,
  },
};

export default (props) => {
  const classes = Style();
  const [radio, setRadio] = React.useState(Forms["divinity"]);
  const manageQuery = (key) => {
    if (!key) {
      const search = window.location.search.split("=")[1];
      key = search && Forms[search] ? search : "divinity";
    }
    window.history.pushState({}, null, `?form=${key}`);
    return setRadio(Forms[key]);
  };
  const RenderComponent = radio.component;
  React.useEffect(() => {
    manageQuery();
    props._();
  }, []);
  return (
    <ThemeProvider theme={Components.Themes.Dark}>
      <div className={classes.root}>
        <Components.Header cfg={"leagueoflegends"} setModal={props.setModal} />
        <Components.Ruby src={Labels.images.scroll} />
        <Components.Blurb title={"Forms & Applications"}>
          Welcome to the TES forms and applications page.
        </Components.Blurb>
        <div className={classes.radioButton}>
          <Components.RadioButton
            row
            onChange={(e) => {
              for (let key in Forms) {
                if (Forms[key].title === e) return manageQuery(key);
              }
            }}
            value={radio.title}
            items={Object.values(Forms).map((el) => el.title)}
          />
        </div>
        <RenderComponent />
        <Components.Footer />
      </div>
    </ThemeProvider>
  );
};
