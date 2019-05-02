import React, { Component } from "react";
import Leagues from "./leagues";
import MenuMini from "./mini_menu";
import SignIn from "./sign_in";
import UserProfile from "./user_profile";
import Events from "./events";
import Event from "./event";
import Search from "./search";
import UserSettings from "./user_settings";
import Teams from "./teams";
import SignUp from "./sign_up";
import Article from "./article";
import ArticleMaker from "./article_maker";
import Alert from "./alert";

export default (state, Obj) => [
  <Leagues index={1} state={state} actions={Obj} />,
  <Alert index={2} state={state} actions={Obj} />,
  <MenuMini index={3} state={state} actions={Obj} />,
  <Event index={4} state={state} actions={Obj} />,
  <SignIn index={6} state={state} actions={Obj} />,
  <UserProfile index={7} state={state} actions={Obj} />,
  <Events index={9} state={state} actions={Obj} />,
  <Search index={10} state={state} actions={Obj} />,
  <UserSettings index={11} state={state} actions={Obj} />,
  <Teams index={12} state={state} actions={Obj} />,
  <SignUp index={15} state={state} actions={Obj} />,
  <Article index={16} state={state} actions={Obj} />,
  <ArticleMaker index={17} state={state} actions={Obj} />
];
