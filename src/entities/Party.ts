import { PoliticalSide } from './PoliticalSide';

export interface Party {
  id: string;
  name: string;
  abbreviation: string;
  description: string;
  politicalSide: PoliticalSide;
  logo_url?: string;
  start_date: string;
  end_date: string;
}