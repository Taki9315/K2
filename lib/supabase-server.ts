import { createClient } from '@supabase/supabase-js';
import type { User } from '@supabase/supabase-js';

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function createAuthClient() {
  const supabaseUrl = getRequiredEnv('NEXT_PUBLIC_SUPABASE_URL');
  const supabaseAnonKey = getRequiredEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY');

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export function createServiceRoleClient() {
  const supabaseUrl = getRequiredEnv('NEXT_PUBLIC_SUPABASE_URL');
  const serviceRoleKey = getRequiredEnv('SUPABASE_SERVICE_ROLE_KEY');

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export async function getUserFromRequest(
  request: Request
): Promise<User | null> {
  const authorizationHeader = request.headers.get('authorization');
  if (!authorizationHeader?.startsWith('Bearer ')) {
    return null;
  }

  const accessToken = authorizationHeader.slice('Bearer '.length).trim();
  if (!accessToken) {
    return null;
  }

  const authClient = createAuthClient();
  const { data, error } = await authClient.auth.getUser(accessToken);

  if (error || !data.user) {
    return null;
  }

  return data.user;
}
