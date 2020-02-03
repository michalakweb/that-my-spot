import React from "react";
import LineSpot from "./LineSpot";

const num = 8;

const LineContainer = () => (
  <div id="line_container">
    {[...Array(num)].map(() => (
      <LineSpot />
    ))}
  </div>
);

export default LineContainer;
