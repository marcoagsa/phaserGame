export interface AboutItem {
  name: string;
  image: string;
  description: string;
  value?: number;
}

export type AboutItemsList = Array<AboutItem>;
