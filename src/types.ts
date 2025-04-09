export interface PoliticalFigure {
  id: string;
  name: string;
  party: string;
  politicalColor: string;
  photo?: string;
  country: string;
  status: string;
  charges: Array<{
    type: string;
    fine: number;
    prisonTime: number;
    date: string;
    source?: string;
  }>;
  sentenceDuration: number;
  fine: number;
}
