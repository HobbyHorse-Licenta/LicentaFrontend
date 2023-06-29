import React from "react";
import { SvgXml } from "react-native-svg";

export default function MaleSvg(){
    
    const variable = `<svg fill="#000000" viewBox="-11.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>male</title> <path d="M7 7.344c0-1.313-1.063-2.375-2.375-2.375-1.281 0-2.344 1.063-2.344 2.375s1.063 2.375 2.344 2.375c1.313 0 2.375-1.063 2.375-2.375zM0.781 10.5h7.906c0.438 0 0.781 0.344 0.781 0.781v5.125c0 0.438-0.344 0.813-0.781 0.813v0c-0.438 0-0.781-0.375-0.781-0.813v-2.344c0-0.438-0.219-0.813-0.5-0.813s-0.5 0.375-0.5 0.813v12.625c0 0.438-0.344 0.781-0.781 0.781v0c-0.438 0-0.781-0.344-0.781-0.781v-5.531c0-0.438-0.281-0.781-0.594-0.781-0.344 0-0.594 0.344-0.594 0.781v5.531c0 0.438-0.375 0.781-0.813 0.781v0c-0.438 0-0.781-0.344-0.781-0.781v-12.625c0-0.438-0.219-0.813-0.5-0.813-0.25 0-0.469 0.375-0.469 0.813v2.344c0 0.438-0.375 0.813-0.813 0.813v0c-0.438 0-0.781-0.375-0.781-0.813v-5.125c0-0.438 0.344-0.781 0.781-0.781z"></path> </g></svg>`
    const MaleSVG = () => <SvgXml xml={variable} width='100%' height='100%'/>
    return (
            <MaleSVG></MaleSVG>
    );
}