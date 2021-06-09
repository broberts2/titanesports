import React from "react";
import { ThemeProvider, Box } from "@material-ui/core";
import _GlobalActions from "globalactions/index";
import { Grid } from "@material-ui/core";
import Components from "components/index";
import Labels from "labels/index";
import Style from "./style";

const GlobalActions = _GlobalActions("leagueoflegends");

const _Card = (classes) => (_) => {
  const article = _.article;
  const matchTag = (tag) => {
    switch (tag) {
      case "pinned":
        return Labels.images.electrocute;
    }
  };
  return (
    <Grid item xs={12} md={6} lg={4} align="flex">
      <Components.InteractiveCard
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
  React.useEffect(async () => {
    const res = await GlobalActions.Requests.getArticles();
    setArticles(res);
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
        <Grid container container spacing={0}>
          {articles
            .filter((el) => (el.published ? el : null))
            .map((article) => (
              <Card article={article} />
            ))}
        </Grid>
        <Components.Footer />
      </div>
    </ThemeProvider>
  );
};
