import React from "react";
import Instagramsvg from "./svgs/Instagramsvg";

const Instagram = (props) => ( // 
    <div className="instagram">
        <a href={`https://www.instagram.com/${props.instagram}`}><Instagramsvg /> {props.instagram}</a>
    </div>
);

export default Instagram;