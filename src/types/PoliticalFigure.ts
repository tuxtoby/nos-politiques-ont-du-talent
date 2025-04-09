export interface PoliticalFigure {
  id: string;
  name: string;
  party: string;
  politicalColor: string;
  photo: string;
  charges: string[];
  sentenceDuration: number; // in months
  fine: number; // total fine amount in euros
}