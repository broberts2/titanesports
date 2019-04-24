import React, { Component } from "react";
import Leagues from "./leagues";
import Stats from "./stats";
import MenuMini from "./mini_menu";
import Teams from "./teams";
import SignIn from "./sign_in";
import UserProfile from "./user_profile";
import Events from "./events";
import Search from "./search";
import UserSettings from "./user_settings";
import Teams2 from "./teams2";
import SignUp from "./sign_up";
import Article from "./article";
import ArticleMaker from "./article_maker";

export default (
  state,
  searchTerm,
  batchSearchTerm,
  cb,
  activeArticle,
  userLogged,
  Obj
) => [
  <Leagues index={1} visible={state} closeModal={() => cb()} />,
  <Stats index={2} isible={state} closeModal={() => cb()} />,
  <MenuMini
    index={3}
    visible={state}
    closeModal={() => cb()}
    action={() => Obj.setMenu(1)}
  />,
  <Teams index={5} visible={state} closeModal={() => cb()} />,
  <SignIn
    index={6}
    visible={state}
    closeModal={() => cb()}
    showUser={num => Obj.showUser(num)}
    newAccount={() => Obj.setMenu(15)}
  />,
  <UserProfile
    index={7}
    self={true}
    visible={state}
    searchTerm={searchTerm}
    closeModal={() => cb()}
    cogAction={() => Obj.setMenu(11)}
  />,
  <UserProfile
    index={8}
    visible={state}
    searchTerm={searchTerm}
    closeModal={() => cb()}
    lastModal={() => Obj.setMenu(10)}
  />,
  <Events index={9} visible={state} closeModal={() => cb()} />,
  <Search
    index={10}
    visible={state}
    action={user => {
      Obj.setSearchTerm(user);
      Obj.setMenu(8);
    }}
    closeModal={() => cb()}
  />,
  <UserSettings
    index={11}
    visible={state}
    lastModal={() => Obj.setMenu(7)}
    closeModal={() => cb()}
    searchTerm={searchTerm}
    signOut={() => Obj.showUser(false)}
  />,
  <Teams2
    index={12}
    visible={state}
    action={users => {
      Obj.setBatchSearchTerm(users);
      setTimeout(() => Obj.setMenu(13), 1);
    }}
    closeModal={() => cb()}
  />,
  <Search
    batchSearchTerm={batchSearchTerm}
    index={13}
    visible={state}
    action={user => {
      Obj.setSearchTerm(user);
      Obj.setMenu(14);
    }}
    closeModal={() => cb()}
    lastModal={() => Obj.setMenu(12)}
  />,
  <UserProfile
    index={14}
    visible={state}
    searchTerm={searchTerm}
    closeModal={() => cb()}
    lastModal={() => Obj.setMenu(13)}
  />,
  <SignUp index={15} visible={state} closeModal={() => cb()} />,
  <Article
    userLogged={userLogged}
    index={16}
    activeArticle={activeArticle}
    visible={state}
    closeModal={() => cb()}
    editModal={() => Obj.editModal()}
    setArticles={() => Obj.setArticles()}
  />,
  <ArticleMaker
    index={17}
    getArticles={() => Obj.getArticles()}
    visible={state}
    closeModal={() => cb()}
  />,
  <ArticleMaker
    index={18}
    setArticles={() => Obj.setArticles()}
    lastModal={() => Obj.setMenu(16)}
    activeArticle={activeArticle}
    visible={state}
    closeModal={() => cb()}
  />
];
