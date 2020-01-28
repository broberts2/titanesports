import React from "react";
import ReactTooltip from "react-tooltip";

let index = 0;

export default {
  [index++]: (
    <div>
      <ReactTooltip />
      <i
        className={"fas fa-fire-alt"}
        style={{ color: "rgb(255, 0, 69)" }}
        data-tip="Pinned"
      />
    </div>
  ),
  [index++]: (
    <div>
      <ReactTooltip />
      <i
        className={"fas fa-bullhorn"}
        style={{ color: "rgb(204, 110, 0)" }}
        data-tip="Announcements"
      />
    </div>
  ),
  [index++]: (
    <div>
      <ReactTooltip />
      <i
        className={"fas fa-exclamation-triangle"}
        style={{ color: "rgb(154, 0, 19)" }}
        data-tip="Alerts"
      />
    </div>
  ),
  [index++]: (
    <div>
      <ReactTooltip />
      <i
        className={"fas fa-comment-dots"}
        style={{ color: "rgb(224, 23, 238)" }}
        data-tip="General"
      />
    </div>
  ),
  [index++]: (
    <div>
      <ReactTooltip />
      <i
        className={"fas fa-feather-alt"}
        style={{ color: "rgb(85, 38, 99)" }}
        data-tip="Story"
      />
    </div>
  ),
  [index++]: (
    <div>
      <ReactTooltip />
      <i
        className={"fas fa-tools"}
        style={{ color: "rgb(82, 103, 134)" }}
        data-tip="Maintenance"
      />
    </div>
  )
};
