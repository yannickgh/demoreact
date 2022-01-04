import React from "react";
import "./style.css";
import Facebooksvg from "./sn/svgs/Facebooksvg.js";
import Whatsapp from "./sn/Whatsapp.js";
import Instagramsvg from "./sn/svgs/Instagramsvg.js";
import Twittersvg from "./sn/svgs/Twittersvg";
import Phonesvg from "./sn/svgs/Phonesvg";


export function Card(props) {
  return (
    <article key={props.index} className="articleContainer">
      <div className="cardContainer">
        <div className="card">
          <div className="top-info-hover-left">{props.item.lieu}
            <div className="top-info-hover-right">{props.item.musique}</div>
          </div>
          <div className="image" style={{backgroundImage: `url(${props.item.url})`}}></div>
          <div className="pad_image"></div>
          <div className="bottom-info">{props.item.artiste}
            <Facebooksvg />
            <Whatsapp tel={props.item.contacts.tel} />
            <Instagramsvg />
            <Twittersvg />
            <Phonesvg />
          </div>
        </div>
      </div>
      <div className="timeline"></div>
    </article>
  );
}
