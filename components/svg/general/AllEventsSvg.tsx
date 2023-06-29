import React from "react";
import { SvgXml } from "react-native-svg";

export default function AllEventsSvg(){
    
    const allEvents = `<svg fill="#000000" viewBox="-3 -3 38 38" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>list-filled</title> <path d="M30 15.25h-17c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h17c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0zM13 5.75h17c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0h-17c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0zM30 26.25h-17c-0.414 0-0.75 0.336-0.75 0.75s0.336 0.75 0.75 0.75v0h17c0.414 0 0.75-0.336 0.75-0.75s-0.336-0.75-0.75-0.75v0zM4 1.25h2c1.519 0 2.75 1.231 2.75 2.75v2c0 1.519-1.231 2.75-2.75 2.75h-2c-1.519 0-2.75-1.231-2.75-2.75v-2c0-1.519 1.231-2.75 2.75-2.75zM3.997 12.25h2c1.519 0 2.75 1.231 2.75 2.75v2c0 1.519-1.231 2.75-2.75 2.75h-2c-1.519 0-2.75-1.231-2.75-2.75v-2c0-1.519 1.231-2.75 2.75-2.75zM3.997 23.25h2c1.519 0 2.75 1.231 2.75 2.75v2c0 1.519-1.231 2.75-2.75 2.75h-2c-1.519 0-2.75-1.231-2.75-2.75v-2c0-1.519 1.231-2.75 2.75-2.75z"></path> </g></svg>`
   
    const AllEventsSVG = () => <SvgXml xml={allEvents} width='100%' height='100%'/>
    return (
            <AllEventsSVG></AllEventsSVG>
    );
}