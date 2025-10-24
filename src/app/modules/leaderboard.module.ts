export interface Player {
  id: number;
  name: string;
  score: number;
  avatar?: string;
}

export type WeekType = 'I' | 'II' | 'III' | 'IV';

export interface LeaderboardEntry {
  customerId: number;
  loginName: string;
  place: number;
  week: WeekType;
}