import React from "react";
import Twittersvg from "./svgs/Twittersvg";
import Twitterpng from "./pngs/Twitterpng";

const Twitter = (props) => ( // 
    <div className="twitter">
        <a href={`https://twitter.com/${props.twitter}`}><Twitterpng /> {props.twitter}</a>
    </div>
);

export default Twitter;