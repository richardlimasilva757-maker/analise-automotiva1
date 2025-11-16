import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos do banco de dados
export type Vehicle = {
  id: string
  user_id: string
  brand: string
  model: string
  year: number
  analysis: any
  created_at: string
  updated_at: string
}

export type Checklist = {
  id: string
  vehicle_id: string
  user_id: string
  type: '48h' | '30days' | 'longterm'
  items: ChecklistItem[]
  created_at: string
  updated_at: string
}

export type ChecklistItem = {
  id: string
  title: string
  description: string
  completed: boolean
  completed_at?: string
}

export type Favorite = {
  id: string
  user_id: string
  vehicle_id: string
  created_at: string
}

export type Reminder = {
  id: string
  user_id: string
  vehicle_id: string
  title: string
  description: string
  due_date: string
  completed: boolean
  created_at: string
}

export type UserProfile = {
  id: string
  user_id: string
  current_vehicle_brand?: string
  current_vehicle_model?: string
  current_vehicle_year?: number
  current_mileage?: number
  usage_intensity?: 'low' | 'medium' | 'high'
  notification_preferences: any
  created_at: string
  updated_at: string
}
