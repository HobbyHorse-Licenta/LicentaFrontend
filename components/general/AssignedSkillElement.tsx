import React from "react";
import { Text } from "react-native-paper";

import { AssignedSkill } from "../../types";
import { uiUtils } from "../../utils";
import Tile from "./Tile";

interface Input {
  assignedSkill: AssignedSkill;
}
const AssignedSkillElement = ({ assignedSkill }: Input) => {
  return (
    <Tile
      color={uiUtils.getColorBasedOnSkillLevel(assignedSkill.masteringLevel)}
      withBorder={true}
    >
      {assignedSkill.skill !== undefined && assignedSkill.skill !== null && (
        <Text>{assignedSkill.skill.name}</Text>
      )}
    </Tile>
  );
};

export default AssignedSkillElement;
