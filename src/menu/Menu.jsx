import "./menu.css";
import React, { useState } from "react";

const display = (nom) => {
  if (nom.length > 12) return nom.substr(0, 12).toLowerCase() + "…";
  return nom.substr(0, 12).toLowerCase();
};

const Menu = (props) => {
  const [active, setActive] = useState(0); // index active
  const [artiste, setArtiste] = useState(-1);
  const [zone, setZone] = useState(-1);
  const [musique, setMusique] = useState(1);

  const artistes = props.artistes;
  const zones = props.zones;
  const musiques = props.musiques;

  const artisteChange = (e) => {
    console.log(e.target.selectedIndex);
  }

  return (
    <div className="menu">
      <div
        key="Pano225"
        className={`button button0 ${active === 0 ? "active" : ""}`}
        onClick={() => {
          setActive(0);
        }}
      >
        Pano225
      </div>
      <div
        key="Artiste"
        className={`button select-artiste ${active === 1 ? "active" : ""}`}
      >
        <select value={artistes[artiste]} onChange={e => artisteChange(e)}>
          <option value="ARTISTE">ARTISTE</option>
          {artistes.map((artiste, index) => {
            return <option value={artiste}>{display(artiste)}</option>;
          })}
        </select>
      </div>
      <div
        key="Zone"
        className={`button button2 ${active === 2 ? "active" : ""}`}
        onClick={() => {
          setActive(2);
        }}
      >
        Zone
      </div>
      <div
        key="Musique"
        className={`button button3 ${active === 3 ? "active" : ""}`}
        onClick={() => {
          setActive(3);
        }}
      >
        Musique
      </div>
    </div>
  );
};

export default Menu;
