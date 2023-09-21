import React from "react";
import { SvgXml } from "react-native-svg";

export default function MaleAndFemaleSvg() {
  const variable = `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9999 14.5028C13.7948 14.5028 15.2499 13.0471 15.2499 11.2514C15.2499 9.4557 13.7948 8 11.9999 8C10.205 8 8.7499 9.4557 8.7499 11.2514C8.7499 13.0471 10.205 14.5028 11.9999 14.5028ZM5.38474 26.0764L8.07629 19.6097V21.8354V29.6806V38.6808C8.07629 39.4065 8.68147 40.0002 9.42113 40.0002C10.1608 40.0002 10.766 39.4065 10.766 38.6808V29.6806H13.3102V38.6808C13.3102 39.4065 13.9154 40.0002 14.655 40.0002C15.3947 40.0002 15.9999 39.4065 15.9999 38.6808L15.9999 29.6806V21.8354V20.057L18.6241 26.0977C18.9542 26.8575 19.8378 27.2059 20.5976 26.8758C21.3574 26.5457 21.7058 25.6621 21.3757 24.9023L18.1273 17.4249C17.7514 16.5597 16.898 16 15.9548 16H11.1769H9.11978H7.909C6.95244 16 6.08976 16.5754 5.72219 17.4585L2.61507 24.9236C2.29673 25.6884 2.65869 26.5665 3.42351 26.8848C4.18833 27.2032 5.06641 26.8412 5.38474 26.0764ZM29.3385 25.0948L32 19.8342V24.3122H32L29.4418 30.8923C29.1458 31.6537 29.7074 32.4746 30.5243 32.4746H32V38.6142C32 39.3975 32.617 40.0384 33.3711 40.0384C34.1251 40.0384 34.7421 39.3975 34.7421 38.6142V32.4746H37.2555V38.6142C37.2555 39.3975 37.8725 40.0384 38.6266 40.0384C39.3806 40.0384 39.9976 39.3975 39.9976 38.6142V32.4746H41.7534C42.5883 32.4746 43.1505 31.6201 42.82 30.8534L40 24.3122H39.9976V19.8292L42.6616 25.0948C43.0356 25.8341 43.938 26.1301 44.6772 25.7561C45.4164 25.3822 45.7125 24.4797 45.3385 23.7405L42.1609 17.4597C41.7078 16.5642 40.7896 15.9997 39.7861 15.9997H35.3365H33.2369H32.2141C31.2106 15.9997 30.2923 16.5642 29.8393 17.4597L26.6616 23.7405C26.2876 24.4797 26.5837 25.3822 27.3229 25.7561C28.0621 26.1301 28.9645 25.8341 29.3385 25.0948ZM36 14.5028C37.7949 14.5028 39.25 13.0471 39.25 11.2514C39.25 9.4557 37.7949 8 36 8C34.2051 8 32.75 9.4557 32.75 11.2514C32.75 13.0471 34.2051 14.5028 36 14.5028Z" fill="#333333"></path> </g></svg>`;
  const MaleAndFemaleSVG = () => (
    <SvgXml xml={variable} width="100%" height="100%" />
  );

  return <MaleAndFemaleSVG></MaleAndFemaleSVG>;
}