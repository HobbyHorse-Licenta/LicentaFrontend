import React from 'react';
import { View } from 'react-native';

import { BasketballSvg, TableTennisSVG, HikingSvg, TennisSvg, BowlingSvg, BiliardSvg } from '../components/svg/sports';
import {SportName} from '../types'


export default function useSvg(sportName : SportName){

  switch(sportName) {
    case SportName.Basketball:
      return <BasketballSvg></BasketballSvg>;
    case SportName.Biliard:
        return <BiliardSvg></BiliardSvg>;
    case SportName.Bowling:
        return <BowlingSvg></BowlingSvg>;
    case SportName.Hiking:
        return <HikingSvg></HikingSvg>;
    case SportName.Ping_Pong:
        return <TableTennisSVG></TableTennisSVG>;
    case SportName.Tennis:
        return <TennisSvg></TennisSvg>;
    default:
      return SportName.Basketball;
  }
    // switch(sportName) {
    //     case 'Ping-Pong':
    //       return <TableTennisSVG></TableTennisSVG>;
    //     case 'Basketball':
    //         return <BasketballSvg></BasketballSvg>;
    //     case 'Tennis':
    //         return <TennisSvg></TennisSvg>;
    //     case 'Hiking':
    //         return <HikingSvg></HikingSvg>
    //     default:
    //       return <TableTennisSVG></TableTennisSVG>;
    //     }
}