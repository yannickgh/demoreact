import React from "react";
import { formatTel } from "./formatTel";
import Whatsappsvg from "./svgs/Whatsappsvg";
import Whatsapppng from "./pngs/Whatsapppng";

const Whatsapp = (props) => ( // 2250102030405
    <div className="whatsapp">
        <a href={`https://wa.me/${props.whatsapp}`}><Whatsapppng /> {formatTel(props.whatsapp)}</a>
    </div>
);

export default Whatsapp;