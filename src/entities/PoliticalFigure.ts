export interface PoliticalFigure {
  id: string;
  name: string;
  party: string;
  politicalSideName: string;
  politicalColor: string;
  photo: string;
  charges: string[];
  sentenceDuration: number;
  fine: number;
}
