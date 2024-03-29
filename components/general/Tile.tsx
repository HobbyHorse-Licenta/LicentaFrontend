import React, { ReactNode } from "react";
import { Pressable, View, StyleSheet, Text, ViewStyle } from "react-native";

import { useTheme } from "react-native-paper";
import { scale } from "react-native-size-matters";

import SvgView from "./SvgView";
import { uiUtils } from "../../utils";

interface Input {
  color?: string;
  withBorder?: boolean;
  children: ReactNode;
  deleteEnabled?: boolean;
  onLongPress?: Function;
  onPress?: Function;
  onDeleteTile?: Function;
  isIcon?: boolean;
}
const Tile = ({
  color,
  children,
  deleteEnabled,
  onLongPress,
  onDeleteTile,
  onPress,
  isIcon,
  withBorder,
}: Input) => {
  const theme = useTheme();
  const backgroundColor = color ? color : theme.colors.secondary;

  const getStyleForIconTile = (): ViewStyle => {
    const style = { backgroundColor: backgroundColor };

    if (withBorder === true) {
      return {
        borderColor: uiUtils.darkenColor(backgroundColor, 10),
        borderWidth: 1,
        ...style,
      };
    } else {
      return style;
    }
  };

  const getStyleForTextTile = (): ViewStyle => {
    const style = { ...styles.tile, backgroundColor: backgroundColor };

    if (withBorder === true) {
      return {
        borderColor: uiUtils.darkenColor(backgroundColor, 10),
        borderWidth: 1,
        ...style,
      };
    } else {
      return style;
    }
  };

  return (
    <View>
      {isIcon === true ? (
        <Pressable
          onPress={() => onPress && onPress()}
          onLongPress={() => onLongPress && onLongPress()}
        >
          <SvgView size="small" style={getStyleForIconTile()}>
            {children}
          </SvgView>
        </Pressable>
      ) : (
        <View style={getStyleForTextTile()}>
          {deleteEnabled === true && (
            <Pressable onPress={() => onDeleteTile && onDeleteTile()}>
              <Text style={{ color: "white" }}>Delete</Text>
            </Pressable>
          )}
          <Pressable
            onPress={() => onPress && onPress()}
            onLongPress={() => onLongPress && onLongPress()}
          >
            {children}
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default Tile;

const styles = StyleSheet.create({
  deleteTile: {
    width: scale(30),
    height: scale(30),
    borderRadius: 25,
    minHeight: 10,
    minWidth: 10,
    maxHeight: 45,
    maxWidth: 45,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    margin: scale(3),
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "red",
  },
  tile: {
    paddingVertical: scale(4),
    paddingHorizontal: scale(8),
    borderRadius: 10,
    minHeight: 25,
    minWidth: 25,
    maxHeight: 120,
    maxWidth: 120,
    alignItems: "center",
    justifyContent: "center",
    margin: scale(7),
  },
});
