import { Sentence } from './Sentence';
import { Party } from './Party';

export interface Politician {
  id: string;
  name: string;
  party: Party;
  photo: string;
  vote_url?: string;
  sentences: Sentence[];
}
