import React from "react";
import "./whatsapp.css";
import Whatsappsvg from "./svgs/Whatsappsvg.js";

const Whatsapp = (props) => ( // 2250102030405
    <span className="whatsapp">
        <a href={`https://wa.me/${props.tel}`}><Whatsappsvg /> {formatTel(props.tel)}</a>
    </span>
);

export default Whatsapp;

const formatTel=(tel)=>{
    if (tel === undefined) {
        return "";
    }
    if (tel.startsWith('225')) {
        return "(+225) "+tel.slice(3);
    }
    return "";
};