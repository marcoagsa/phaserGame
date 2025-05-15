export interface ScoreItem {
  _id: string;
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
