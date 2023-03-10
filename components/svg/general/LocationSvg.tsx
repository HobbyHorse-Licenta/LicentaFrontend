import React from "react";
import { SvgXml } from "react-native-svg";

interface Input {
    color?: string
}
export default function LocationSvg({color}: Input){
    
    const getColor = (): string => {
        if(color) return color;
        else return defaultColor;
    }
    const defaultColor = 'white';
    const variable = `<svg viewBox="-5 -5 35 35" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#b0560c"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.5 11H15.5M12 7.5V14.5M20 11C20 15.1429 16.8509 18.5502 12.8159 20.6077C12.3032 20.8691 11.6968 20.8691 11.1841 20.6077C7.14909 18.5502 4 15.1429 4 11C4 6.58172 7.58172 3 12 3C16.4183 3 20 6.58172 20 11Z" stroke="` + getColor() + `" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`

    const LocationSVG = () => <SvgXml xml={variable} width='100%' height='100%'/>
    return (
            <LocationSVG></LocationSVG>
    );
}