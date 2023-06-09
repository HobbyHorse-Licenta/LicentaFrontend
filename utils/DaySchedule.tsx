import { Day } from "../types";

class DaySchedule {

    getWeekDates(): Array<number>{
        const currentDayOfMonth = new Date().getDate();
        return Array.from({length: 7}, (_, i) => i + currentDayOfMonth);
    }
    getDayOfWeekFromDayOfMonth(dayOfMonth: number, daysOfWeekArray: Array<string>): string{
        const currentDate = new Date();
        currentDate.setDate(dayOfMonth);
        const dayOfWeekIndex = currentDate.getDay();
        return daysOfWeekArray[dayOfWeekIndex];
    }
    getDayOfWeekFromDayOfMonthLongForm(dayOfMonth: number): string {
        const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return this.getDayOfWeekFromDayOfMonth(dayOfMonth, daysOfWeek);
    }
    getDayOfWeekFromDayOfMonthMinimumForm(dayOfMonth: number): string {
        const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        return this.getDayOfWeekFromDayOfMonth(dayOfMonth, daysOfWeek);
    }

}
const dayScheduleUtils = new DaySchedule();
export default dayScheduleUtils;
  
  
  
  
  