import React, { Component } from "react";
import Leagues from "./leagues";
import Stats from "./stats";
import MenuMini from "./mini_menu";
import RiotTermsOfUse from "./riot_tou";

export default (state, cb, chain) => [
  <Leagues visible={state} closeModal={() => cb()} />,
  <Stats visible={state} closeModal={() => cb()} />,
  <MenuMini visible={state} closeModal={() => cb()} action={() => chain(1)} />,
  <RiotTermsOfUse visible={state} closeModal={() => cb()} />
];
