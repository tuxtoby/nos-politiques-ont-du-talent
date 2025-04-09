export interface Sentence {
    type: string;
    fine: number;
    'prison-time': number;
    date: string;
    source?: string;
}

export interface Politician {
    name: string;
    'political-group': string;
    'political-side': string;
    sentences: Sentence[];
}

declare const data: Politician[];
export default data;
