import { ReactNode } from "react";

export type Day = {
    name: string;
    index: number;
};

export type PairColor = {
  main: string;
  highlights: string;
};

export type EventDescription = {
  level: string;
  location: string;
  note: string;
};

export type Sport = {
  sportName: SportName
}

export enum SportName {
  Basketball = 'Basketball',
  Tennis = 'Tennis',
  Bowling = 'Bowling',
  Biliard = 'Biliard',
  Ping_Pong = 'Ping-Pong',
  Hiking = 'Hiking'
}
export type SportLevel = 'Healthy beginner' | 'Intermediate athlete' | 'Advanced athlete' | 'Elite athlete';

export type Skill = {
  sport: Sport,
  level: SportLevel,
}

export type User = {
  profileImageUrl: string,
  shortDescription: string,
  followers?: Array<User>[],
  following?: Array<User>[],
  skills: Array<Skill>
}
export type Zone = {
  id: number,
  fixedPoint: number;
}

export type Schedule = {
  id: number,
  startTime: Date,
  endTIme: Date,
  sports: Array<SportName>,
  zone: Zone
}

export type Event = {
  id: number,
  name: string,
  imageUrl: string,
  level: SportLevel,
  location: string,
  description?: string,
  users?: Array<User>[]
}
