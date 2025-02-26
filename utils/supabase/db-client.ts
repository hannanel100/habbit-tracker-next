import { createClient } from '@/utils/supabase/server';
import { db } from '@/db';
import { habitsRepository } from '@/db/repositories/habits';

// This utility combines Supabase auth with our Drizzle repositories
export async function getAuthenticatedDb() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  return {
    user,
    supabase,
    db,
    habits: habitsRepository
  };
}
