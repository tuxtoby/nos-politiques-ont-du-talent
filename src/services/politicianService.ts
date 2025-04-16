import { Politician } from '../entities/Politician';

export function findPoliticianBySimplifiedName(
  politicians: Politician[],
  simplifiedName: string
): Politician | undefined {
  return politicians.find(
    (politician) => politician.simplified_name === simplifiedName
  );
}
