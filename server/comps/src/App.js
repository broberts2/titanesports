import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./app.css";

import Components from "./comps/components";

export default function App() {
  return (
    <Router>
      <Route exact path="/video_loop" render={() => <Components.VideoLoop />} />
    </Router>
  );
}
