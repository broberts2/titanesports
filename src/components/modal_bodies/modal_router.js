import React, { Component } from "react";
import Leagues from "./leagues";
import Stats from "./stats";

export default (modal, visible, cb) => {
  switch (modal) {
    case "leagues":
      return <Leagues visible={visible} closeModal={() => cb()} />;
      break;
    case "stats":
      return <Stats visible={visible} closeModal={() => cb()} />;
      break;
  }
};
