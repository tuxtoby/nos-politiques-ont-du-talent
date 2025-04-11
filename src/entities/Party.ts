import { PartyFamily } from "./PartyFamily";
import { PoliticalSide } from "./PoliticalSide";

export interface Party {
    id: string;
    family: PartyFamily;
    name: string;
    abbreviation: string;
    politicalSide: PoliticalSide;
    logo_url?: string;
    start_date: string;
    end_date: string;
}