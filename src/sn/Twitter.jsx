import React from "react";
import Twittersvg from "./svgs/Twittersvg";

const Twitter = (props) => ( // 
    <div className="twitter">
        <a href={`https://twitter.com/${props.twitter}`}><Twittersvg /> {props.twitter}</a>
    </div>
);

export default Twitter;