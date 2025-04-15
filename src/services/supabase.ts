export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      politicians: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          party_id: string;
          political_side_id: number;
          photo_url?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          first_name: string;
          last_name: string;
          party_id: string;
          political_side_id: number;
          photo_url?: string;
          created_at: string;
          updated_at: string;
        };
        Update: {
          id: string;
          first_name?: string;
          last_name?: string;
          party_id?: string;
          political_side_id?: number;
          photo_url?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      sentences: {
        Row: {
          id: string;
          politician_id: string;
          type: string;
          fine: number;
          prison_time: number;
          date: string;
          source: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Insert: {
          id?: string;
          politician_id: string;
          type: string;
          fine: number;
          prison_time: number;
          date: string;
          source?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          politician_id?: string;
          type?: string;
          fine?: number;
          prison_time?: number;
          date?: string;
          source?: string | null;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
