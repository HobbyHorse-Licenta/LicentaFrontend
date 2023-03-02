import React from 'react';

import { BasketballSvg, TableTennisSVG, HikingSvg, TennisSvg } from '../components/svg/sports';
import {SportName} from '../types'

export default function useSvg(sport : SportName){

    switch(sport.sport) {
        case 'Ping-Pong':
          return <TableTennisSVG></TableTennisSVG>;
        case 'Basketball':
            return <BasketballSvg></BasketballSvg>;
        case 'Tennis':
            return <TennisSvg></TennisSvg>;
        case 'Hiking':
            return <HikingSvg></HikingSvg>
        default:
          return <TableTennisSVG></TableTennisSVG>;
        }
}