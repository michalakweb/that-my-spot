import React from "react";
import OverallScore from "./OverallScore";
import CardContainer from "./CardContainer";
import ExtraInfo from "./ExtraInfo";

const Footer = () => (
  <div id="footer">
    <OverallScore />
    <CardContainer />
    <ExtraInfo />
  </div>
);

export default Footer;
