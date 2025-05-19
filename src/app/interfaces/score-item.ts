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

export interface ScoreSaveResponse {
  status: number;
  message: number;
}

export interface ScoresResponse {
  status: number;
  result: ScoreItemsList;
}
