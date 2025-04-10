export interface SentenceDto {
  id: string;
  politician_id: string;
  type: string;
  fine: number;
  prison_time: number;
  date: string;
  source_url?: string;
  created_at: string;
  updated_at: string;
}
