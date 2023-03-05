import { StyleSheet } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";


export const SpacingStyles = StyleSheet.create({
    fullSizeContainer: {
        height: '100%',
        width: '100%',
    },
    header: {
      height: '100%',
      width: '100%',
      borderBottomRightRadius: 60,
      borderBottomLeftRadius: 60
    },
    bottomHeaderAddOn: {
      height: verticalScale(20),
      borderBottomRightRadius: 10,
      borderBottomLeftRadius: 10
    },
    centeredContainer: {
        alignItems: 'center',
        justifyContent:'center'
    },
    topBarSize: {
        height: verticalScale(53),
        width: '100%'
    },
    container: {
        flex: 1,
        paddingHorizontal: scale(24),
        marginVertical: scale(16),
      },
      day: {
        width: scale(32),
        height: scale(32),
        margin: scale(4),
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.6,
      },
      daySelected: {
        borderWidth: scale(1),
        borderRadius: scale(32),
        opacity: 1,
      },
      daysContainer:{
        flexDirection: "row",
        justifyContent: "space-evenly",
        flexWrap: 'wrap',
        paddingVertical: scale(16),
        borderRadius: scale(12),
      },
      flex: { flex: 1 },
      reminderHint: {
        marginTop: scale(16),
      },
      reminderBlock: {
        flexDirection: "row",
      },
      reminderCard:{
        borderRadius: scale(12),
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: scale(16),
        marginBottom: scale(8),
      },
      tile: {
        width: scale(45),
        height: scale(45),
        borderRadius: 25, 
        minHeight: 25,
        minWidth: 25,
        maxHeight: 120,
        maxWidth: 120, 
        alignItems: 'center',
        justifyContent: 'center',
        margin: scale(7)
      },
      selectTimeContainer: {
        borderRadius: 15, 
        minHeight: 25,
        minWidth: 25,
        maxHeight: 200,
        maxWidth: 200, 
        alignItems: 'center',
        justifyContent: 'center',
        padding: scale(30),
        margin: scale(15)
      },
      containerInsideSchedule: {
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
      },
      row: { flexDirection: "row" },
      timeContainer: { justifyContent: "center", flex: 1, alignItems: "center" },
      timeText: { fontSize: scale(80) },
      popUpContainer: {
        alignSelf: 'flex-start',
        position: 'absolute',
        top: -verticalScale(40)
      }
})