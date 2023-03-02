import React from "react";
import { SvgXml } from "react-native-svg";

export default function PlusSvg(){

    const variable = `<svg viewBox="-8 -8 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 7V17M7 12H17" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg> `

    const PlusSVG = () => <SvgXml xml={variable} width='100%' height='100%'/>
    return (
            <PlusSVG></PlusSVG>
    );
}