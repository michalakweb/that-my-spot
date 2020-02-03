import React from "react";
import Card from "./Card";

const num = 5;

const CardContainer = () => (
  <div id="card_container">{[...Array(num).map(() => <Card />)]}</div>
);

export default CardContainer;
