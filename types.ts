export type PairColor = {
  main: string;
  highlights: string;
};

export type RenderElement = {
  id: string | number,
  element: JSX.Element
}


export enum MarkerType {
  Start,
  Finish,
  Checkpoint,
  ParkTrail,
  AttendedEvent,
  RecommendedEvent
}

export enum SportName {
  InlineSkating = 'InlineSkating'
}

export enum MasteringLevel {
  Novice = 'Novice',//'you have 0 experience with the skill',
  Begginer = 'Begginer',//'you tried the skill just a bit',
  Competent = 'Competent',//'you are average at it',
  Proficient = 'Proficient',//'you are good at it',
  Expert = 'Expert',//'this skill is second nature to you',
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
  Female = 'Female',
  Mixed = 'Mixed'
}

//////////////////////////////////////////////////


export type SkateProfile = {
  id: string,
  userId: string,
  user?: User,
  events?: Array<Event>,
  recommendedEvents?: Array<Event>,
  assignedSkills?: Array<AssignedSkill>,
  schedules?: Array<Schedule>,
  skateType: SkatesType,
  skatePracticeStyle: SkatePracticeStyles,
  skateExperience: SkateExperience
}

export type Skill = {
  id: string
  name: string,
}

export type SkillRecommendation = {
  id: string,
  skill: Skill,
  skatePracticeStyle: SkatePracticeStyles,
  skateExperience: SkateExperience
}

export type AssignedSkill = {
  id: string,
  skateProfileId: string,
  skillId: string
  skill?: Skill,
  masteringLevel: MasteringLevel
}

///////////////////////////////////////////////////

export type User = {
  id: string,
  pushNotificationToken?: string,
  skateProfiles: Array<SkateProfile>
  name: string,
  age: number,
  gender: Gender,
  shortDescription: string,
  profileImageUrl?: string,
  
}

export type Outing = {
  id: string,
  eventId: string,
  startTime: number,
  endTime: number,
  days: Array<Day>,
  skatePracticeStyle: SkatePracticeStyles,
  votedDay: Day,
  votedStartTime: number,
  trail: CustomTrail | ParkTrail,
  booked: boolean
}


export type Trail = {
  id: string,
  name: string
}

export type CustomTrail = Trail & {
  checkPoints: Array<CheckPoint>
}

export type ParkTrail = Trail & {
  practiceStyle: SkatePracticeStyles,
  practiceStyle2?: SkatePracticeStyles,
  capacity?: number,
  location: Location,
  openingHour: number,
  closingHour: number
}

export type Event = {
  id: string,
  name: string,
  note: string,
  maxParticipants: number,
  skateExperience: SkateExperience,
  outing: Outing,
  skateProfiles?: Array<SkateProfile>,
  recommendedSkateProfiles?: Array<SkateProfile>,
  scheduleRefrences: Array<ScheduleRefrence>,
  imageUrl?: string,
  description?: string,
  gender: Gender,
  minimumAge: number,
  maximumAge: number
}

export type AggresiveEvent = {
  id: string,
  name: string,
  note: string,
  maxParticipants: number,
  skateExperience: SkateExperience,
  outing: AggresiveOuting,
  skateProfiles?: Array<SkateProfile>,
  scheduleRefrences: Array<ScheduleRefrence>
  days?: Array<Day>,
  imageUrl?: string,
  description?: string,
  gender: Gender,
  minimumAge: number,
  maximumAge: number
}


export type ScheduleRefrence = {
  id: string,
  scheduleId?: string,
  skateProfileId: string,
  eventOwner: boolean,
  yesVote: boolean
}

export type Day = {
  dayOfMonth: number,
  id: string;
};


export type AggresiveOuting = {
  id: string,
  eventId: string,
  startTime: number,
  endTime: number,
  skatePracticeStyle: SkatePracticeStyles,
  trail: CustomTrail,
  booked: boolean
}

export type Zone = {
  id: string,
  name?: string,
  range: number,
  location: Location
  locationId: string,
  schedule?: Schedule, 
  scheduleId: string,
}


export type Location = {
  id: string,
  name?: string,
  imageUrl?: string,
  lat: number,
  long: number
}

export type CheckPoint = {
  id: string,
  name?: string,
  order: number,
  customTrailId: string,
  location: Location
}

export type Schedule = {
  id: string,
  days: Array<Day>
  skateProfileId: string,
  startTime: number,
  endTime: number,
  zones: Array<Zone>,
  minimumAge?: number,
  maximumAge?: number,
  gender: Gender,
  maxNumberOfPeople: number
  
}


