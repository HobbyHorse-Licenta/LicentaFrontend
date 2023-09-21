import React, { useState } from "react";
import { View } from "react-native";

import { useTheme } from "react-native-paper";
import uuid from "react-native-uuid";

import { RenderElement } from "../../types";
import { PlusSvg } from "../svg/general";
import Tile from "./Tile";

interface Input {
  objectsArray: Array<RenderElement> | null;
  onPressAdd?: Function;
  onDeleteTile?: Function;
  onTilePress?: Function;
  tileColor?: string;
  tileWithBorder?: boolean;
}

const TileList = ({
  objectsArray,
  onPressAdd,
  tileColor,
  tileWithBorder,
  onTilePress,
  onDeleteTile,
}: Input) => {
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(
    undefined
  );

  const theme = useTheme();
  return (
    <View>
      <Tile
        color={theme.colors.tertiary}
        isIcon={true}
        onPress={() => onPressAdd !== undefined && onPressAdd()}
      >
        <PlusSvg></PlusSvg>
      </Tile>
      {objectsArray !== null &&
        objectsArray.map((object, index) => {
          return (
            <Tile
              key={uuid.v4().toString()}
              color={tileColor}
              withBorder={tileWithBorder}
              deleteEnabled={index === selectedIndex}
              onDeleteTile={() =>
                onDeleteTile !== undefined && onDeleteTile(object)
              }
              onPress={() => onTilePress !== undefined && onTilePress(object)}
              onLongPress={() => setSelectedIndex(index)}
            >
              {object.element}
            </Tile>
          );
        })}
    </View>
  );
};

export default TileList;
