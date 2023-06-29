import React from "react";
import { SvgXml } from "react-native-svg";

export default function LevelSvg(){

    const variable = `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--emojione" preserveAspectRatio="xMidYMid meet" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14 4.5v55c0 3.4 6 3.4 6 0v-55c0-3.3-6-3.3-6 0" fill="#333"> </path> <path d="M6.6 42h20.8c2.5 0 4.6-2.3 4.6-5s-2.1-5-4.6-5H6.6C4.1 32 2 34.3 2 37s2.1 5 4.6 5" fill="#6d7275"> </path> <path d="M6.9 39.6h20.2c2.4 0 4.5-1.7 4.5-3.8s-2-3.8-4.5-3.8H6.9c-2.4 0-4.5 1.7-4.5 3.8s2 3.8 4.5 3.8" fill="#94989b"> </path> <g fill="#5b636b"> <path d="M59 10H39c-4 0-4-6 0-6h20c4 0 4 6 0 6"> </path> <path d="M57 20H39c-4 0-4-6 0-6h18c4 0 4 6 0 6"> </path> <path d="M55 30H39c-4 0-4-6 0-6h16c4 0 4 6 0 6"> </path> </g> <g fill="#F85F60"> <path d="M53 40H39c-4 0-4-6 0-6h14c4 0 4 6 0 6"> </path> <path d="M51 50H39c-4 0-4-6 0-6h12c4 0 4 6 0 6"> </path> <path d="M49 60H39c-4 0-4-6 0-6h10c4 0 4 6 0 6"> </path> </g> </g></svg>`

    const LevelSVG = () => <SvgXml xml={variable} width='100%' height='100%'/>
    return (
            <LevelSVG></LevelSVG>
    );
}