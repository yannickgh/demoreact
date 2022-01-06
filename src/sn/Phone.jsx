import React from "react";
import { formatTel } from "./formatTel";
import Phonesvg from "./svgs/Phonesvg";

const Phone = (props) => ( // 2250102030405
    <div className="phone">
        <a href={`tel:${props.tel}`}><Phonesvg /> {formatTel(props.tel)}</a>
    </div>
);

export default Phone;