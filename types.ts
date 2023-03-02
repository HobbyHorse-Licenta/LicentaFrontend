export type Day = {
    name: string;
    index: number;
};

export type EventDescription = {
  level: string;
  location: string;
  note: string;
};

export type SportName = {
  sport: 'Basketball' | 'Tennis' | 'Bowling' | 'Biliard' | 'Ping-Pong' | 'Hiking'
}

export type Sports = {
  sportName: SportName
}