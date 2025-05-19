export interface ScoreItem {
  userId: string;
  name: string;
  level: number;
  scale: number;
  points: number;
  date: Date;
}

export type ScoreItemsList = Array<ScoreItem>;

export interface GameScoreInfo {
  name: string;
  level: number;
  scale: number;
  points: number;
}
