import React, { Component } from "react";
import Leagues from "./leagues";
import Stats from "./stats";
import MenuMini from "./mini_menu";
import RiotTermsOfUse from "./riot_tou";
import Teams from "./teams";
import SignIn from "./sign_in";
import UserProfile from "./user_profile";
import Events from "./events";
import Search from "./search";

export default (state, searchTerm, cb, Obj) => [
  <Leagues index={1} visible={state} closeModal={() => cb()} />,
  <Stats index={2} isible={state} closeModal={() => cb()} />,
  <MenuMini
    index={3}
    visible={state}
    closeModal={() => cb()}
    action={() => Obj.setMenu(1)}
  />,
  <RiotTermsOfUse index={4} visible={state} closeModal={() => cb()} />,
  <Teams index={5} visible={state} closeModal={() => cb()} />,
  <SignIn
    index={6}
    visible={state}
    closeModal={() => cb()}
    showUser={num => Obj.showUser(num)}
  />,
  <UserProfile
    index={7}
    self={true}
    visible={state}
    searchTerm={searchTerm}
    closeModal={() => cb()}
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
  />
];
