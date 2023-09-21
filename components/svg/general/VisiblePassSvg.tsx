import React from "react";
import { SvgXml } from "react-native-svg";

export default function VisiblePassSvg() {
  const variable = `<svg fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>alt-eye</title> <path d="M0 16q0.064 0.16 0.16 0.448t0.48 1.056 0.832 1.632 1.248 1.888 1.664 1.984 2.144 1.888 2.624 1.6 3.136 1.088 3.712 0.416 3.712-0.416 3.168-1.088 2.592-1.6 2.144-1.888 1.664-1.984 1.248-1.888 0.832-1.6 0.48-1.12l0.16-0.416q-0.032-0.16-0.16-0.416t-0.48-1.088-0.832-1.6-1.248-1.888-1.664-2.016-2.144-1.856-2.624-1.632-3.136-1.056-3.712-0.448-3.712 0.416-3.168 1.12-2.592 1.6-2.144 1.888-1.664 1.984-1.248 1.888-0.832 1.6-0.48 1.12zM8 16q0-3.296 2.336-5.632t5.664-2.368 5.664 2.368 2.336 5.632-2.336 5.664-5.664 2.336-5.664-2.336-2.336-5.664zM12 16q0 1.664 1.184 2.848t2.816 1.152 2.816-1.152 1.184-2.848-1.184-2.816-2.816-1.184q-0.032 0-0.096 0.032t-0.096 0q0.192 0.576 0.192 0.992 0 1.248-0.864 2.112t-2.144 0.864q-0.384 0-0.96-0.192 0 0.032-0.032 0.096t0 0.096z"></path> </g></svg>`;

  const VisiblePassSVG = () => (
    <SvgXml xml={variable} width="100%" height="100%" />
  );
  return <VisiblePassSVG></VisiblePassSVG>;
}
