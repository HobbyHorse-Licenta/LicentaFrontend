
import React, { useCallback, useState } from "react";
import { Alert, Platform, Pressable, ToastAndroid, View, Button} from "react-native";

import {Text} from 'react-native-paper'
import { SafeAreaView } from "react-navigation";
//import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import DateTimePickerModal from "react-native-modal-datetime-picker";
//import PushNotification from "react-native-push-notification";

import { SpacingStyles} from '../../styles';
import {Day} from '../../types';
import strings from '../../assets/strings';

const days: Day[] = [{name : 'S', index: 1}, 
{name : 'M', index: 2},
{name : 'T', index: 3},
{name : 'W', index: 4},
{name : 'T', index: 5},
{name : 'F', index: 6},
{name : 'S', index: 7},
];

const SelectDaysAndTime = () => {

  const [selectedDays, setSelectedDays] = useState<Array<Day>>([]);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [time, setTime] = useState<Date>(new Date());

  const isActiveDay = useCallback(
    (thisDay: Day, days: Array<Day>) => {
      return days.includes(thisDay);
    },
    []
  );

  const onChangeDate = (selectedTime: Date | undefined) => {
    if (selectedTime) {
      setTime(selectedTime);
      console.log("Done smth");
      setIsDatePickerVisible(false);
    }
  };

  const selectDay = (day: Day) => {
    if (isActiveDay(day, selectedDays)) {
      const filtered = selectedDays.filter((v) => v !== day);
      setSelectedDays(filtered);
    } else {
      setSelectedDays((prev) => [...prev, day]);
    }
  };

  const handleChangeTime = () => {
    setIsDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setIsDatePickerVisible(false);
  };

//   const saveReminder = () => {
//     if (selectedDays.length === 0) {
//       if (Platform.OS === "android") {
//         ToastAndroid.show(strings.ErrorSelectDay, ToastAndroid.SHORT);
//       } else {
//         Alert.alert(strings.ErrorSelectDay);
//       }
//       return;
//     }

//     if (paramReminder) {
//       removeNotification(paramReminder.id, paramReminder.days);
//       createNotification(paramReminder.id, time, selectedDays);
//       const reminder: ReminderType = {
//         id: paramReminder.id,
//         time: time.getTime(),
//         days: selectedDays,
//       };
//       dispatch(remindersActions.updateReminder(reminder));
//     } else {
//       const idGenerated = (Math.random() * (RMAX - RMIN) + RMIN)
//         .toFixed(0)
//         .toString();
//       createNotification(idGenerated, time, selectedDays);
//       const reminder: ReminderType = {
//         id: idGenerated,
//         time: time.getTime(),
//         days: selectedDays,
//       };
//       dispatch(remindersActions.setReminders(reminder));
//     }
//     navigation.goBack();
//   };

//   const createNotification = (id: string, time: Date, dates: Array<any>) => {
//     dates.forEach((day) => {
//       PushNotification.localNotificationSchedule({
//         id: `${id}${DAYS.indexOf(day)}`,
//         channelId: "quoteapp-notifications",
//         title: "Quoteapp",
//         message: strings.NewQuote,
//         date: calculateDateByDay(time, day),
//         allowWhileIdle: true,
//         repeatType: "week",
//       });
//     });
//   };

//   const removeNotification = (id: string, dates: Array<any>) => {
//     try {
//       const unselectedDays = dates.filter((day) => !selectedDays.includes(day));
//       const ids = unselectedDays.map((day) => `${id}${DAYS.indexOf(day)}`);
//       if (ids.length > 0) {
//         PushNotification.removeDeliveredNotifications(ids);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

  // const calculateDateByDay = (time: Date, day: any) => {
  //   const daysFromNow = DAYS.findIndex((d) => d === day) - time.getDay();
  //   let calculatedDate = moment(time).add(daysFromNow, "day");
  //   if (daysFromNow <= 0) {
  //     calculatedDate = moment(calculatedDate).add(1, "week");
  //   }
  //   return calculatedDate.toDate();
  // };



  return (
    <SafeAreaView style={SpacingStyles.container}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Pressable onPress={handleChangeTime}>
          <Text >
           {time.getHours()} : {time.getMinutes()}
          </Text>
        </Pressable>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          display="spinner"
          onConfirm={onChangeDate}
          onCancel={hideDatePicker}
          locale="en_EN"
          is24Hour={true}
          date={time}
        />
      </View>
      <View >
        <View >
          {days.map((day, index) => {
            return (
              <Pressable key={index} onPress={() => selectDay(day)}>
                <View
                  style={[
                    SpacingStyles.day,
                    isActiveDay(day, selectedDays) && SpacingStyles.daySelected,
                  ]}
                >
                  <Text>
                    {days[1].name}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>
      <View style={SpacingStyles.row}>
        <Button title={strings.cancel} />
        <Button title={strings.finish} />
      </View>
    </SafeAreaView>
  );
};

export default SelectDaysAndTime;