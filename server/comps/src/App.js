import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./app.css";

import components from "./comps/components";

export default function App() {
  return (
    <Router>
      <Route path="/:id" render={props => components({ ...props })} />
    </Router>
  );
}
