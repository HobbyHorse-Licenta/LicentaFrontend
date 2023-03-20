import { SportName } from "../types";
import { basketUrl, tennisUrl, pingPongUrl, biliardUrl, bowlingUrl, hikingUrl } from "../assets/imageUrls";

class ResourceAccess {
  
    getDefaultEventImage = (sport: SportName) => {
      switch(sport) {
        case SportName.Basketball:
          return basketUrl;
        case SportName.Biliard:
          return biliardUrl;
        case SportName.Bowling:
          return bowlingUrl;
        case SportName.Hiking:
          return hikingUrl;
        case SportName.Ping_Pong:
          return pingPongUrl;
        case SportName.Tennis:
          return tennisUrl;
        default:
          return tennisUrl;
      }
    }
}
    const resourceAccess = new ResourceAccess();
    export default resourceAccess;
  
  
  
  
  