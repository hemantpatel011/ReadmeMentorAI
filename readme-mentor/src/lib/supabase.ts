import { createClient } from '@supabase/supabase-js'

function createSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your_supabase_url_here')) {
    return null
  }

  try {
    return createClient(supabaseUrl, supabaseAnonKey)
  } catch (error) {
    console.warn('Failed to create Supabase client:', error)
    return null
  }
}

export const supabase = createSupabaseClient()

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          email: string
          full_name: string | null
          avatar_url: string | null
          github_username: string | null
        }
        Insert: {
          id: string
          created_at?: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          github_username?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          github_username?: string | null
        }
      }
      readme_generations: {
        Row: {
          id: string
          created_at: string
          user_id: string
          github_url: string
          repository_name: string
          generated_readme: string
          analysis_data: Record<string, unknown> | null
          feedback_rating: number | null
          feedback_text: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          github_url: string
          repository_name: string
          generated_readme: string
          analysis_data?: Record<string, unknown> | null
          feedback_rating?: number | null
          feedback_text?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          github_url?: string
          repository_name?: string
          generated_readme?: string
          analysis_data?: Record<string, unknown> | null
          feedback_rating?: number | null
          feedback_text?: string | null
        }
      }
    }
  }
}