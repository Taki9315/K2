import { createBrowserClient } from '@supabase/ssr';

// Modern @supabase/ssr browser client – avoids Proxy/Reflect recursion
// that the old createClient pattern causes in Next.js App Router 2025+.
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          role: 'admin' | 'borrower' | 'lender' | 'network';
          status: 'active' | 'inactive' | 'suspended';
          preferred: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: 'admin' | 'borrower' | 'lender' | 'network';
          status?: 'active' | 'inactive' | 'suspended';
          preferred?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: 'admin' | 'borrower' | 'lender' | 'network';
          status?: 'active' | 'inactive' | 'suspended';
          preferred?: boolean;
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
          file_url: string | null;
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
      providers: {
        Row: {
          id: string;
          name: string;
          email: string;
          company: string;
          type: string;
          state: string;
          website: string | null;
          description: string;
          status: 'pending' | 'approved' | 'declined';
          admin_notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          company?: string;
          type?: string;
          state?: string;
          website?: string | null;
          description?: string;
          status?: 'pending' | 'approved' | 'declined';
          admin_notes?: string | null;
        };
        Update: {
          name?: string;
          email?: string;
          company?: string;
          type?: string;
          state?: string;
          website?: string | null;
          description?: string;
          status?: 'pending' | 'approved' | 'declined';
          admin_notes?: string | null;
        };
      };
    };
  };
};
