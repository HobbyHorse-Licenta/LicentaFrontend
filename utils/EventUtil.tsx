import Color from "color";

import { SkateProfile } from "../types";
import { IdTokenResult } from "firebase/auth";
import { Fetch } from "../services";
import { Event } from "../types";
import validation from "./Validation";

class EventUtil {
  darkenColor(color: string, percentage: number) {
    return Color(color)
      .darken(percentage / 100)
      .hex();
  }

  isOwnerOfEvent = (
    event: Event,
    currentSkateProfile: SkateProfile | undefined
  ) => {
    if (
      event !== undefined &&
      event.scheduleRefrences !== undefined &&
      event.scheduleRefrences.length > 0 &&
      currentSkateProfile !== undefined
    ) {
      const scheduleRefrenceOfCurrentUser = event.scheduleRefrences.find(
        scheduleRef => scheduleRef.skateProfileId === currentSkateProfile.id
      );
      if (scheduleRefrenceOfCurrentUser !== undefined) {
        return scheduleRefrenceOfCurrentUser.eventOwner;
      } else {
        console.log(
          "ERROR: this event should not be displayed for this skating profile"
        );
      }
    } else {
      console.log("Event has no schedule refrences");
    }
  };

  leaveEvent(
    currentSkateProfile: SkateProfile | undefined,
    JWTTokenResult: IdTokenResult | undefined,
    eventId: string,
    onSuccessCallback: Function,
    onFailCallback: Function
  ) {
    if (currentSkateProfile !== undefined) {
      if (
        JWTTokenResult !== undefined &&
        !validation.isJWTTokenExpired(JWTTokenResult)
      ) {
        Fetch.leaveSkateProfileFromEvent(
          JWTTokenResult.token,
          currentSkateProfile.id,
          eventId,
          () => onSuccessCallback(),
          () => onFailCallback()
        );
      }
    }
  }

  deleteEvent(
    JWTTokenResult: IdTokenResult | undefined,
    eventId: string,
    onSuccessCallback: Function,
    onFailCallback: Function
  ) {
    if (
      JWTTokenResult !== undefined &&
      !validation.isJWTTokenExpired(JWTTokenResult)
    ) {
      Fetch.deleteEvent(
        JWTTokenResult.token,
        eventId,
        () => onSuccessCallback(),
        () => onFailCallback()
      );
    }
  }
  joinEvent(
    currentSkateProfile: SkateProfile | undefined,
    JWTTokenResult: IdTokenResult | undefined,
    eventId: string,
    onSuccessCallback: Function,
    onFailCallback: Function
  ) {
    if (currentSkateProfile !== undefined) {
      if (
        JWTTokenResult !== undefined &&
        !validation.isJWTTokenExpired(JWTTokenResult)
      ) {
        Fetch.joinSkateProfileToEvent(
          JWTTokenResult.token,
          currentSkateProfile.id,
          eventId,
          () => onSuccessCallback(),
          () => onFailCallback()
        );
      }
    }
  }
}
const eventUtils = new EventUtil();
export default eventUtils;
