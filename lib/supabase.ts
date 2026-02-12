import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          description: string;
          type: 'workbook' | 'membership';
          price: number;
          stripe_price_id: string | null;
          is_active: boolean;
          features: any;
          created_at: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          amount: number;
          status: 'pending' | 'completed' | 'failed' | 'refunded';
          stripe_payment_intent_id: string | null;
          created_at: string;
        };
      };
      memberships: {
        Row: {
          id: string;
          user_id: string;
          status: 'active' | 'cancelled' | 'expired';
          started_at: string;
          expires_at: string | null;
          stripe_subscription_id: string | null;
          created_at: string;
        };
      };
      content: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string;
          type: 'video' | 'article';
          access_level: 'public' | 'members_only';
          video_url: string | null;
          article_content: string | null;
          thumbnail_url: string | null;
          category: string;
          is_published: boolean;
          view_count: number;
          created_at: string;
          updated_at: string;
        };
      };
      submissions: {
        Row: {
          id: string;
          user_id: string;
          answers_json: Record<string, unknown>;
          summary_text: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          answers_json: Record<string, unknown>;
          summary_text?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          answers_json?: Record<string, unknown>;
          summary_text?: string | null;
          created_at?: string;
        };
      };
    };
  };
};
