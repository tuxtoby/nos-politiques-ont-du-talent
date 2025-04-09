export interface PoliticalFigure {
  id: string;
  name: string;
  party: string;
  politicalColor: string;
  sentenceDate: string;
  sentenceDuration: number; // in months
  charges: string[];
  fine: number; // total fine amount in euros
  photo: string;
}

export interface PartyStats {
  partyName: string;
  totalCases: number;
  averageSentence: number;
  totalPoliticians: number;
}

export interface YearlyStats {
  year: number;
  totalCases: number;
  partiesInvolved: string[];
  averageSentence: number;
}
