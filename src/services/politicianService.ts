import { PoliticalFigure } from "../entities/PoliticalFigure";
import { Politician, Sentence } from "../entities/Politician";
import { politicalSideNames } from "../entities/PoliticalSide";
import { politicalColors } from "../domains/political/colors";

export function transformPoliticians(politicians: Politician[]): PoliticalFigure[] {
  return politicians.map((politician: Politician, index: number) => transformPolitician(politician, index));
}

export function transformPolitician(politician: Politician, index: number): PoliticalFigure {
  return {
    id: String(index + 1),
    name: politician.first_name + " " + politician.last_name,
    party: politician.politicalGroup,
    politicalSideName: politicalSideNames[politician.politicalSide],
    politicalColor: politicalColors[politician.politicalSide],
    photo: politician.photo,
    charges: extractCharges(politician.sentences),
    sentenceDuration: calculateTotalSentenceDuration(politician.sentences),
    fine: calculateTotalFine(politician.sentences)
  };
}

function extractCharges(sentences: Sentence[]): string[] {
  return sentences.map(sentence => sentence.type);
}

function calculateTotalSentenceDuration(sentences: Sentence[]): number {
  return sentences.reduce((total: number, sentence: Sentence) => total + sentence.prisonTime, 0);
}

function calculateTotalFine(sentences: Sentence[]): number {
  return sentences.reduce((total: number, sentence: Sentence) => total + sentence.fine, 0);
}
