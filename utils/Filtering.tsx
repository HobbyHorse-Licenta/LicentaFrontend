import { SkateProfile } from "../types";

class Filtering {
  excludeSkateProfile(
    skateProfiles: Array<SkateProfile>,
    skateProfileToExclude: SkateProfile
  ): Array<SkateProfile> {
    const filteredSkateProfiles = skateProfiles.filter(
      skateProfile => skateProfile.id != skateProfileToExclude.id
    );
    return filteredSkateProfiles;
  }
}
const filterUtils = new Filtering();
export default filterUtils;
