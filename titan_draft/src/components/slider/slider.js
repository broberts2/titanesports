import React, { useState } from "react";
import "./slider.css";

export default function ReactSlider(props) {
  const [value, setValue] = useState(0);
  return (
    <div className="slider-wrapper">
      <div className={"components"}>
        <div className={"track"} />
        <input
          type="range"
          id="volume"
          name="volume"
          min="0"
          max="100"
          value={value}
          onInput={e => {
            props.setVolume((e.target.value / 100) * 0.2);
            setValue(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
