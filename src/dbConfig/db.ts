import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://eudsqvnhwlmvakxqpdfj.supabase.co"
const supabasePublishableKey = "sb_publishable__I9nKQM_KstcqUrgnXyVKQ_o9tiAIGH"

const supabase = createClient(supabaseUrl,supabasePublishableKey)

export default supabase