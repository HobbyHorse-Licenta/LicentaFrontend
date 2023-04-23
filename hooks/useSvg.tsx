import React from 'react';

import { BasketballSvg, TennisSvg } from '../components/svg/sports';
import {SportName} from '../types'


export default function useSvg(sportName : SportName){

  switch(sportName) {
    case SportName.InlineSkating:
      return <BasketballSvg></BasketballSvg>;
    default:
      return <TennisSvg></TennisSvg>;
  }
}