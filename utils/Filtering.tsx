import React from 'react'
import {RefObject} from 'react'
import { Location, MarkerType, ParkTrail, SkateProfile, Zone } from '../types';
import MapView, { Circle, LatLng, Marker } from "react-native-maps";
import { useTheme } from 'react-native-paper';
import Constants from 'expo-constants';

import { COLORS } from '../assets/colors/colors';
import MapViewDirections from 'react-native-maps-directions';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Image } from 'react-native';


class Filtering {
    
    excludeSkateProfile (skateProfiles: Array<SkateProfile>, skateProfileToExclude: SkateProfile ) : Array<SkateProfile> {
        const filteredSkateProfiles = skateProfiles.filter(skateProfile => skateProfile.id != skateProfileToExclude.id);
        return filteredSkateProfiles;
    }
    
}
    const filterUtils = new Filtering();
    export default filterUtils;
  
  
  
  
  