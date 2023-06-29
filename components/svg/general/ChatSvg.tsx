import React from "react";
import { SvgXml } from "react-native-svg";

export default function ChatSvg(){
    
    const chat = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg fill="#000000" width="800px" height="800px" viewBox="-1 -1 25 25" id="chat-left-2" data-name="Flat Line" xmlns="http://www.w3.org/2000/svg" class="icon flat-line"><path id="secondary" d="M20,4H8A1,1,0,0,0,7,5V15a1,1,0,0,0,1,1h3v3l5-3h4a1,1,0,0,0,1-1V5A1,1,0,0,0,20,4Z" style="fill: rgb(44, 169, 188); stroke-width: 2;"></path><path id="primary" d="M7,20H4a1,1,0,0,1-1-1V8" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path><path id="primary-2" data-name="primary" d="M20,4H8A1,1,0,0,0,7,5V15a1,1,0,0,0,1,1h3v3l5-3h4a1,1,0,0,0,1-1V5A1,1,0,0,0,20,4Z" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path></svg>`
   
    const ChatSVG = () => <SvgXml xml={chat} width='100%' height='100%'/>
    return (
            <ChatSVG></ChatSVG>
    );
}