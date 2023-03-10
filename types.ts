import { ReactNode } from "react";

export type Day = {
    name: string;
    index: number;
};

export type EventDescription = {
  level: string;
  location: string;
  note: string;
};

export type Sport = {
  sportName: SportName
  imageIcon: ReactNode 
}

export type SportName = 'Basketball' | 'Tennis' | 'Bowling' | 'Biliard' | 'Ping-Pong' | 'Hiking'; 
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

export type Event = {
  id: number
  imageUrl: string,
  level: SportLevel,
  location: string,
  description?: string,
  users?: Array<User>[]
}
