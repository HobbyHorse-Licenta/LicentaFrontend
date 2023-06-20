import React from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'

import { Text, useTheme } from 'react-native-paper';
import { scale } from 'react-native-size-matters';

import { Gender } from '../../types';
import { SvgView } from '../general';
import { FemaleSvg, MaleAndFemaleSvg, MaleSvg } from '../svg/general';

interface Input {
    gender: Gender
}

const GenderDisplay = ({gender} : Input) =>
{

  const theme = useTheme();
  const colorStyle: ViewStyle = {backgroundColor: theme.colors.tertiary};

    switch (gender) {
        case Gender.Female:
          return(
            <View style={[styles.genderComponentWithText, colorStyle]}>
              <Text variant="labelMedium">Only</Text>
              <SvgView size="medium">
                <FemaleSvg></FemaleSvg>
              </SvgView>
              <Text variant="labelMedium">skaters</Text>
            </View>
          )
          break;

        case Gender.Male:
          return(
            <View style={[styles.genderComponentWithText, colorStyle]}>
              <Text variant="labelMedium">Only</Text>
              <SvgView size="medium">
                <MaleSvg></MaleSvg>
              </SvgView>
              <Text variant="labelMedium">skaters</Text>
            </View>
          )
          break;

        case Gender.Mixed:
          return(
            <View style={[styles.genderComponentWithText, colorStyle]}>
              <Text variant="labelMedium">Both</Text>
              <SvgView size="medium">
                <MaleAndFemaleSvg></MaleAndFemaleSvg>
              </SvgView>
              <Text variant="labelMedium">skaters</Text>
            </View>
          )
          break;
    
        default:
          return(
            <View style={[styles.genderComponentWithText, colorStyle]}>
              <Text variant="labelMedium">Only</Text>
              <SvgView size="medium">
                <FemaleSvg></FemaleSvg>
              </SvgView>
              <Text variant="labelMedium">skaters</Text>
            </View>
          )
          break;
      }
}
export default GenderDisplay;

const styles = StyleSheet.create({
    genderComponentWithText: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: scale(15),
      borderRadius: 20
    }
  })