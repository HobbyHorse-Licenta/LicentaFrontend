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
  sportName: 'Basketball' | 'Tennis' | 'Bowling' | 'Biliard' | 'Ping-Pong' | 'Hiking'
}