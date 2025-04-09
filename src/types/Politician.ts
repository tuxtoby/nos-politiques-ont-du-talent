export interface Sentence {
    type: string;
    fine: number;
    prisonTime: number;
    date: string;
    source?: string;
}

export interface Politician {
    name: string;
    politicalGroup: string;
    politicalSide: string;
    photo: string;
    sentences: Sentence[];
}

declare const data: Politician[];
export default data;
