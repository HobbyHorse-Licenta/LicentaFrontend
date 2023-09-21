import React from "react";
import { SvgXml } from "react-native-svg";

export default function MapsSvg() {
  const maps = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" id="maps" data-name="Flat Line" xmlns="http://www.w3.org/2000/svg" class="icon flat-line"><path id="secondary" d="M9,4V18L3,20V6Zm6,2V20l6-2V4Z" style="fill: rgb(44, 169, 188); stroke-width: 2;"></path><path id="primary" d="M21,4V18l-6,2L9,18,3,20V6L9,4l6,2ZM15,6,9,4V18l6,2Z" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path></svg>`;

  const MapsSVG = () => <SvgXml xml={maps} width="100%" height="100%" />;
  return <MapsSVG></MapsSVG>;
}
