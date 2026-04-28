import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fdrujjytdefcwjjrtojb.supabase.co'

const supabaseAnonKey = 'sb_publishable_rZ4CLekc3sw49XJ_goqpdw_G19JmLSv'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)