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
  Hiking = 'Hiking',
  InlineSkating = 'InlineSkating'
}

export type Sport = {
  sportName: SportName
}

export enum SkatesType {
  AggressiveSkates = 'Aggressive Skates',
  CasualSkates = 'Casual Skates',
  SpeedSkates = 'Speed Skates'
}

export enum SkateExperience {
  Begginer = 'Begginer',
  AdvancedBegginer = 'Advanced Begginer',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced'
}

export enum SkatePracticeStyles {
  AggresiveSkating = 'Aggresive Skating',
  CasualSkating = 'Casual Skating',
  SpeedSkating = 'Speed Skating'
}


export enum Gender {
  Male = 'Male',
  Female = 'Female'
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
  id: string,
  startTime: Date,
  endTime: Date,
}

export type StateTimeRange = {
  startTime: number,
  endTime: number,
}

export type Event = {
  id: number,
  name: string,
  imageUrl?: string,
  description: EventDescription,
  users?: Array<User>[],
  note?: string;
}
export type EventDescription = {
  sportName: SportName
  sportLevel: SportLevel;
  location: Location;
};

