// import "./menu.css";
import "../style.css";
import React, { useState, useEffect, useContext } from "react";
import { getURLStart } from "../getUrl";
import { ParamsContext } from "../ParamsContext";

const display = (nom) => {
  if (nom.length > 12) return nom.substr(0, 12) + "…";
  return nom;
};

export function Menu() {
  const { params, setParams } = React.useContext(ParamsContext);

  const URL_START = getURLStart();

  const [active, setActive] = useState(0); // index active 0, 1, 2, 3

  const [artistes, setArtistes] = useState([]);
  const [zones, setZones] = useState([]);
  const [musiques, setMusiques] = useState([]);

  const artisteNullValue = { select: "ARTISTE" };
  const [artisteSelectedValue, setArtisteSelectedValue] =
    useState(artisteNullValue);

  const zoneNullValue = { select: "ZONE" };
  const [zoneSelectedValue, setZoneSelectedValue] = useState(zoneNullValue);

  const musiqueNullValue = { select: "MUSIQUE" };
  const [musiqueSelectedValue, setMusiqueSelectedValue] =
    useState(musiqueNullValue);

  useEffect(() => {
    loadMenus();
  }, []);

  useEffect(() => {
    setMenus();
  }, [params]);

  const setMenus = () => {
    switch (params.mode) {
      case 0:
        setArtisteSelectedValue(artisteNullValue);
        setZoneSelectedValue(zoneNullValue);
        setMusiqueSelectedValue(musiqueNullValue);
        setActive(0);
        break;
      case 1:
        setArtisteSelectedValue({select: params.param});
        setZoneSelectedValue(zoneNullValue);
        setMusiqueSelectedValue(musiqueNullValue);
        setActive(1);
        break;
      case 2:
        setArtisteSelectedValue(artisteNullValue);
        setZoneSelectedValue({select: params.param});
        setMusiqueSelectedValue(musiqueNullValue);
        setActive(2);
        break;
      case 3:
        setArtisteSelectedValue(artisteNullValue);
        setZoneSelectedValue(zoneNullValue);
        setMusiqueSelectedValue({select: params.param});
        setActive(3);
        break;
      default:
        setActive(0);
        break;
    }
  };

  const loadMenus = async () => {
    const URL_START = getURLStart();
    await fetch(`${URL_START}/api/articles/artistes/`)
      .then((res) => res.json())
      .then((res) => {
        setArtistes([...res]);
      });
    await fetch(`${URL_START}/api/articles/musiques/`)
      .then((res) => res.json())
      .then((res) => {
        setMusiques([...res]);
      });
    await fetch(`${URL_START}/api/articles/zones/`)
      .then((res) => res.json())
      .then((res) => {
        setZones([...res]);
      });
  };

  const homeClick = (e) => {
    if (active !== 0) {
      setActive(0);
      setArtisteSelectedValue(artisteNullValue);
      setZoneSelectedValue(zoneNullValue);
      setMusiqueSelectedValue(musiqueNullValue);
      setParams({ mode: 0, param: "" });
    }
  };

  const artisteChange = (e) => {
    if (e.target.selectedIndex === 0) {
      setArtisteSelectedValue(artisteNullValue);
    } else {
      setActive(1);
      setArtisteSelectedValue({ select: e.target.value });
      setZoneSelectedValue(zoneNullValue);
      setMusiqueSelectedValue(musiqueNullValue);
      setParams({ mode: 1, param: e.target.value });
    }
  };

  const zoneChange = (e) => {
    if (e.target.selectedIndex === 0) {
      setZoneSelectedValue(zoneNullValue);
    } else {
      console.log("zoneChange " + e.target.value);
      setActive(2);
      setArtisteSelectedValue(artisteNullValue);
      setZoneSelectedValue({ select: e.target.value });
      setMusiqueSelectedValue(musiqueNullValue);
      setParams({ mode: 2, param: e.target.value });
    }
  };

  const musiqueChange = (e) => {
    if (e.target.selectedIndex === 0) {
      setMusiqueSelectedValue(musiqueNullValue);
    } else {
      setActive(3);
      setArtisteSelectedValue(artisteNullValue);
      setZoneSelectedValue(zoneNullValue);
      setMusiqueSelectedValue({ select: e.target.value });
      setParams({ mode: 3, param: e.target.value });
    }
  };

  return (
    <div className="menu">
      <div
        key="Pano225"
        className={`item button0 ${active === 0 ? "actif" : ""}`}
        onClick={(e) => {
          homeClick(e);
        }}
      >
        Pano225
      </div>
      <div
        key="Artiste"
        className={`item select-menu select-artiste ${active === 1 ? "actif" : ""}`}
      >
        <select
          value={artisteSelectedValue.select}
          onChange={(e) => artisteChange(e)}
        >
          <option value="ARTISTE">ARTISTE</option>
          {artistes.map((artiste, index) => {
            return <option value={artiste}>{display(artiste)}</option>;
          })}
        </select>
      </div>
      <div
        key="Zone"
        className={`item select-menu select-zone ${active === 2 ? "actif" : ""}`}
      >
        <select
          value={zoneSelectedValue.select}
          onChange={(e) => zoneChange(e)}
        >
          <option value="ZONE">ZONE</option>
          {zones.map((zone, index) => {
            return <option value={zone}>{display(zone)}</option>;
          })}
        </select>
      </div>
      <div
        key="Musique"
        className={`item select-menu select-musique ${active === 3 ? "actif" : ""}`}
      >
        <select
          value={musiqueSelectedValue.select}
          onChange={(e) => musiqueChange(e)}
        >
          <option value="MUSIQUE">MUSIQUE</option>
          {musiques.map((musique, index) => {
            return <option value={musique}>{display(musique)}</option>;
          })}
        </select>
      </div>
    </div>
  );
}
