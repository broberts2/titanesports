import React, { Component } from "react";
import MyRadarChart from "react-svg-radar-chart";

const noSmoothing = points => {
  let d = "M" + points[0][0].toFixed(4) + "," + points[0][1].toFixed(4);
  for (let i = 1; i < points.length; i++) {
    d += "L" + points[i][0].toFixed(4) + "," + points[i][1].toFixed(4);
  }
  return d + "z";
};
const options = {
  size: 200,
  axes: true, // show axes?
  scales: 10, // show scale circles?
  captions: true, // show captions?
  captionMargin: 55,
  dots: true, // show dots?
  zoomDistance: 1.2, // where on the axes are the captions?
  setViewBox: options =>
    `-${options.captionMargin} 0 ${options.size +
      options.captionMargin * 2} ${options.size}`, // custom viewBox ?
  smoothing: noSmoothing, // shape smoothing function
  axisProps: () => ({ className: "axis" }),
  scaleProps: () => ({ className: "scale", fill: "none" }),
  shapeProps: () => ({ className: "shape" }),
  captionProps: () => ({
    className: "caption",
    textAnchor: "middle",
    fontFamily: "sans-serif"
  }),
  dotProps: () => ({
    className: "dot",
    mouseEnter: dot => {
      console.log(dot);
    },
    mouseLeave: dot => {
      console.log(dot);
    }
  })
};

class RadarChart extends Component {
  render() {
    const data = [
      {
        data: {
          cs: 0.7,
          kda: 0.8,
          gold: 0.9,
          vs: 0.67
        },
        meta: { color: "blue" }
      },
      {
        data: {
          cs: 0.6,
          kda: 0.85,
          gold: 0.5,
          vs: 0.6
        },
        meta: { color: "red" }
      }
    ];

    const captions = {
      // columns
      cs: "CS",
      kda: "KDA",
      gold: "Gold",
      vs: "Vision Score"
    };
    return (
      <div className={"radar-chart"}>
        <MyRadarChart
          captions={captions}
          data={data}
          options={options}
          size={350}
        />
      </div>
    );
  }
}

export default RadarChart;
