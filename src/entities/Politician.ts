export interface Sentence {
    type: string;
    fine: number;
    prisonTime: number;
    date: string;
    source?: string;
}

export interface Politician {
    first_name: string;
    last_name: string;
    politicalGroup: string;
    politicalSide: number;
    photo: string;
    sentences: Sentence[];
}
