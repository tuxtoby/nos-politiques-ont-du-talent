export interface PoliticalFigure {
  id: string;
  name: string;
  party: string;
  politicalColor: string;
  country: string;
  sentenceDate: string;
  sentenceDuration: number; // in months
  charges: string[];
  status: 'sentenced' | 'appealing' | 'completed';
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
