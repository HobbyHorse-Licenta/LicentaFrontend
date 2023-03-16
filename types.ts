import { ReactNode } from "react";



export type PairColor = {
  main: string;
  highlights: string;
};






export type Day = {
  name: DayName;
  index: number;
};

export type DayName = {
  minimumForm: string;
  shortForm: string;
  longForm: string;
};

export const WeekDays: Day[] = 
[
  {name: { minimumForm: 'M', shortForm: 'Mon', longForm: 'Monday'}, index: 1},
  {name: { minimumForm: 'T', shortForm: 'Tue', longForm: 'Tuesday'}, index: 2},
  {name: { minimumForm: 'W', shortForm: 'Wed', longForm: 'Wednesday'}, index: 3},
  {name: { minimumForm: 'T', shortForm: 'Thu', longForm: 'Thursday'}, index: 4},
  {name: { minimumForm: 'F', shortForm: 'Fri', longForm: 'Friday'}, index: 5},
  {name: { minimumForm: 'S', shortForm: 'Sat', longForm: 'Saturday'}, index: 6},
  {name: { minimumForm: 'S', shortForm: 'Sun', longForm: 'Sunday'}, index: 7}
]










export enum SportName {
  Basketball = 'Basketball',
  Tennis = 'Tennis',
  Bowling = 'Bowling',
  Biliard = 'Biliard',
  Ping_Pong = 'Ping-Pong',
  Hiking = 'Hiking'
}

export type Sport = {
  sportName: SportName
}

export type SportLevel = 'Healthy beginner' | 'Intermediate athlete' | 'Advanced athlete' | 'Elite athlete';

export type Skill = {
  sport: Sport,
  level: SportLevel,
}









export type User = {
  id: string
  profileImageUrl: string,
  shortDescription: string,
  followers?: Array<User>[],
  following?: Array<User>[],
  skills: Array<Skill>
}




export type Zone = {
  id: number,
  range: number,
  fixedPoint: GpsPoint;
}

export type GpsPoint = {
  lat: number,
  long: number
}

export type Location = {
  id: string,
  name: string,
  imageUrl?: string,
  gpsPoint: GpsPoint
}




export type Schedule = {
  id: number,
  timeRange: TimeRange,
  sports: Array<SportName>,
  zone: Zone
}

export type TimeRange = {
  id: number,
  startTime: Date,
  endTIme: Date,
}

export type Event = {
  id: number,
  name: string,
  imageUrl: string,
  description: EventDescription,
  users?: Array<User>[]
}
export type EventDescription = {
  sportLevel: string;
  location: Location;
  note?: string;
};

