import React from "react";
import { SvgXml } from "react-native-svg";

export default function ScheduleSvg() {
  const schedule = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg width="800px" height="800px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="#000000" d="M224 160a64 64 0 0 0-64 64v576a64 64 0 0 0 64 64h576a64 64 0 0 0 64-64V224a64 64 0 0 0-64-64H224zm0-64h576a128 128 0 0 1 128 128v576a128 128 0 0 1-128 128H224A128 128 0 0 1 96 800V224A128 128 0 0 1 224 96z"/><path fill="#000000" d="M384 416a64 64 0 1 0 0-128 64 64 0 0 0 0 128zm0 64a128 128 0 1 1 0-256 128 128 0 0 1 0 256z"/><path fill="#000000" d="M480 320h256q32 0 32 32t-32 32H480q-32 0-32-32t32-32zm160 416a64 64 0 1 0 0-128 64 64 0 0 0 0 128zm0 64a128 128 0 1 1 0-256 128 128 0 0 1 0 256z"/><path fill="#000000" d="M288 640h256q32 0 32 32t-32 32H288q-32 0-32-32t32-32z"/></svg>`;

  const ScheduleSVG = () => (
    <SvgXml xml={schedule} width="100%" height="100%" />
  );
  return <ScheduleSVG></ScheduleSVG>;
}
