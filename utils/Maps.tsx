
class Maps {
    radiansToDegrees(angle): number {
    return angle * (180 / Math.PI);
    }
    
    degreesToRadians(angle) {
    return angle * (Math.PI / 180);
    }
    
    latitudesToKM(latitudes) {
    return latitudes * 110.574;
    }
    
    kMToLatitudes(km) {
    return km / 110.574;
    }
    
    longitudesToKM(longitudes, atLatitude) {
    return longitudes * 111.32 * Math.cos(this.degreesToRadians(atLatitude));
    }
    
    kMToLongitudes(km, atLatitude) {
    return km * 0.0200000 / Math.cos(this.degreesToRadians(atLatitude));
    }

}
    const maps = new Maps();
    export default maps;
  
  
  
  
  