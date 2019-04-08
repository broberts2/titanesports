import React, { Component } from "react";
import Leagues from "./leagues";
import Stats from "./stats";

export default (state, cb) => [
  <Leagues visible={state} closeModal={() => cb()} />,
  <Stats visible={state} closeModal={() => cb()} />
];
