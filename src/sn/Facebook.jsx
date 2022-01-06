import React from "react";
import Facebooksvg from "./svgs/Facebooksvg";

const Facebook = (props) => ( // 
    <div className="facebook">
        <a href={`https://facebook.com/${props.facebook}`}><Facebooksvg /> {props.facebook}</a>
    </div>
);

export default Facebook;