import React from "react";

function Card(props) {
  return (
    <div className="card">
      <p>{props.weatherValue + " " + props.units}</p>
      <h2>{props.weatherType}</h2>
    </div>
  );
}

export default Card;
