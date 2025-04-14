import { Party } from "../../../entities/Party";
import { PoliticalSide } from "../../../entities/PoliticalSide";
import { Politician } from "../../../entities/Politician";

export interface LeaderboardData {
    id: string;
    name: string;
    caption: string;
    politicalEntity: Politician | Party | PoliticalSide;
    logo_url: string;
    vote_url?: string;
    numberOfSentences: number;
    totalPrisonTime: number;
    totalFine: number;
}