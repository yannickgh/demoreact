import React from "react";
import "./style.css";

export function Periode(props) {
  return (
    <article className="nouvellePeriod">
        <div className="periodeMarker"></div>
        <div className="periodeContent">{props.date}</div>
    </article>
  );
}
