import React from "react";
import { ThemeProvider, Box } from "@material-ui/core";
import _GlobalActions from "globalactions/index";
import { Grid } from "@material-ui/core";
import Components from "components/index";
import Labels from "labels/index";
import Style from "./style";

const GlobalActions = _GlobalActions("leagueoflegends");

const matchTag = (tag) => {
  switch (tag) {
    case "pinned":
      return Labels.images.tags.pinned;
    case "rankings":
      return Labels.images.tags.rankings;
  }
};

const _Card = (classes) => (_) => {
  const article = _.article;
  return (
    <Grid item className={classes.gridItem} xs={12} md={6} lg={4} align="flex">
      <Components.InteractiveCard
        fill
        onClick={() => (window.location = `/article?id=${article._id}`)}
      >
        <div className={classes.cardBody}>
          <img className={classes.cardImg} src={article.bannerimgurl} />
          <img className={classes.cardImgIcon} src={article.iconImgUrl} />
          <div className={classes.content}>
            <Components.Typography variant="h6" className={classes.typography6}>
              {article.title}
            </Components.Typography>
            <Components.Typography>
              {article.modifieddate}
            </Components.Typography>
            <Box display="flex" style={{ width: "100%", height: "100%" }}>
              {article.tags.map((tag) => (
                <img src={matchTag(tag)} className={classes.tag} />
              ))}
            </Box>
          </div>
          <div className={classes.author}>
            <Components.Typography>{article.author}</Components.Typography>
          </div>
        </div>
      </Components.InteractiveCard>
    </Grid>
  );
};

export default (props) => {
  const classes = Style();
  const Card = _Card(classes);
  const [articles, setArticles] = React.useState([]);
  const [permissions, setPermissions] = React.useState({});
  const [tags, setTags] = React.useState({
    pinned: { text: "Pinned", value: true },
    rankings: { text: "Rankings", value: true },
  });
  React.useEffect(async () => {
    const res = await GlobalActions.Requests.getArticles();
    const permissions = await GlobalActions.Requests.getMyPermissions();
    setPermissions(permissions);
    if (res) setArticles(res.filter((el) => (el.published ? el : null)));
    props._();
  }, []);
  return (
    <ThemeProvider theme={Components.Themes.Dark}>
      <div className={classes.root}>
        <Components.Header cfg={"leagueoflegends"} setModal={props.setModal} />
        <Components.Ruby src={Labels.images.unsealedspellbook} />
        <Components.Blurb title={"News & Staff Articles"}>
          Welcome to the TES News & Articles section! Here you find our newest
          announcements, schedules, and seasonal power rankings. You'll also
          find many short blogs from staff members here detailing what they've
          been up to.
        </Components.Blurb>
        <Components.Box display="flex">
          {Object.keys(tags).map((key) => (
            <Components.PrimaryButton
              style={{ opacity: tags[key].value ? 1 : 0.35 }}
              onClick={() => {
                const newTags = tags;
                newTags[key]["value"] = !newTags[key]["value"];
                setTags((lastTags) => ({ ...lastTags, ...newTags }));
              }}
            >
              <img
                style={{
                  width: "30px",
                  marginTop: "-10px",
                  marginBottom: "-10px",
                  marginRight: "10px",
                }}
                src={matchTag(key)}
              />
              {tags[key].text}
            </Components.PrimaryButton>
          ))}
        </Components.Box>
        <Grid container container spacing={0}>
          {articles
            ? articles
                .filter((article) => {
                  let value = false;
                  article.tags.map((tag) =>
                    Object.keys(tags).map((key) =>
                      tags[key].value && tag === key ? (value = true) : null
                    )
                  );
                  return value;
                })
                .map((article) => <Card article={article} />)
            : null}
        </Grid>
        <Components.Footer />
      </div>
    </ThemeProvider>
  );
};
