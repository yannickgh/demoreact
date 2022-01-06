import React from "react";
import "./style.css";
import Facebook from "./sn/Facebook";
import Whatsapp from "./sn/Whatsapp";
import Instagram from "./sn/Instagram.jsx";
import Twitter from "./sn/Twitter";
import Phone from "./sn/Phone.jsx";

export function Card(props) {
  return (
    <>
      <div className="cardContainer">
        <div className="card">
          <div className="top-info-hover-left">
            {props.article.lieu}
            <div className="top-info-hover-right">{props.article.musique}</div>
          </div>
          <div className="pad_image">
            {props.article.tel && <Phone tel={props.article.tel} />}
            {props.article.tel2 && <Phone tel={props.article.tel2} />}
            {props.article.whatsapp && (
              <Whatsapp whatsapp={props.article.whatsapp} />
            )}
            {props.article.instagram && (
              <Instagram instagram={props.article.instagram} />
            )}
            {props.article.twitter && (
              <Twitter twitter={props.article.twitter} />
            )}
            {props.article.facebook && (
              <Facebook facebook={props.article.facebook} />
            )}
          </div>
          <div className="bottom-info">{props.article.artiste}</div>
          <div
            className="image"
            style={{ backgroundImage: `url(${props.article.url})` }}
          ></div>
        </div>
      </div>
      <div className="timeline"></div>
    </>
  );
}
