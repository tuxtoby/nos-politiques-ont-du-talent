import { Politician } from '../../../../entities/Politician';
import { Party } from '../../../../entities/Party';
import { PoliticalSide } from '../../../../entities/PoliticalSide';

export function getEntityType(
  entity: Politician | Party | PoliticalSide
): 'politician' | 'party' | 'politicalSide' {
  if ('sentences' in entity) {
    return 'politician';
  } else if ('abbreviation' in entity) {
    return 'party';
  } else {
    return 'politicalSide';
  }
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

export function formatSourceUrl(source: string): string {
  if (isValidUrl(source)) {
    return source;
  }

  const urlMatch = source.match(/https?:\/\/[^\s]+/);
  if (urlMatch) {
    return urlMatch[0];
  }

  return '';
}
