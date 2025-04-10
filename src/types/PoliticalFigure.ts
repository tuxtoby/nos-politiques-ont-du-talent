export interface PoliticalFigure {
  id: string;
  name: string;
  party: string;
  politicalSideName: string;
  politicalColor: string;
  photo: string;
  charges: string[];
  sentenceDuration: number; // in months
  fine: number; // total fine amount in euros
}