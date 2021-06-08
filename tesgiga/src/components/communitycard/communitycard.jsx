import React from "react";
import Components from "components/components";
import Style from "./style";

export default (props) => {
  const classes = Style();
  const miniblock = (data) => (
    <div className={classes.miniblock}>
      <Components.Typography variant="h6" color="inherit">
        {data.text}
        <br />
        {data.link ? (
          <a href={data.link} target={"_blank"}>
            {data.link}
          </a>
        ) : (
          data.subtext
        )}
      </Components.Typography>
    </div>
  );
  return (
    <div className={classes.root}>
      <div className={classes.crown}>
        <img src="https://ddragon.leagueoflegends.com/cdn/11.10.1/img/profileicon/7.png" />
      </div>
      <Components.InteractiveCard color="primary">
        <div className={classes.content}>
          <div style={{ textAlign: "center" }}>
            <Components.Typography variant="h4">
              <b>Jetgorilla</b>
            </Components.Typography>
          </div>
          {miniblock({
            text: "Prefered Position(s):",
            subtext: "Jungle, Midlane",
          })}
          {miniblock({
            text: "Affiliation(s):",
            subtext: "None",
          })}
          {miniblock({ text: "OP.GG Link:", link: "https://google.com" })}
        </div>
      </Components.InteractiveCard>
    </div>
  );
};
