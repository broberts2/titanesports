import React, { Component } from "react";
import Leagues from "./leagues";
import Stats from "./stats";
import MenuMini from "./mini_menu";
import RiotTermsOfUse from "./riot_tou";
import Teams from "./teams";
import SignIn from "./sign_in";

export default (state, cb, Obj) => [
  <Leagues visible={state} closeModal={() => cb()} />,
  <Stats visible={state} closeModal={() => cb()} />,
  <MenuMini
    visible={state}
    closeModal={() => cb()}
    action={() => Obj.setMenu(1)}
  />,
  <RiotTermsOfUse visible={state} closeModal={() => cb()} />,
  <Teams visible={state} closeModal={() => cb()} />,
  <SignIn
    visible={state}
    closeModal={() => cb()}
    setHeaderTitle={num => Obj.setHeaderTitle(num)}
  />
];
