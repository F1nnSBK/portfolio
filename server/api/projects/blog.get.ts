import { serverSupabaseClient } from '#supabase/server'
import type { Database } from '~/types/database.types'

type BlogPost = Database['public']['Tables']['blog_posts']['Row']

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event)
  const query = getQuery(event)

  const { data, error } = await client
  .from('blog_posts')
  .select('*')
  .eq('published', true)
  .order('created_at', { ascending: false })
  .limit(1)
  .single()
  
  if (error) {
    throw createError({
      statusCode: error.code === 'PGRST116' ? 404 : 500,
      statusMessage: error.message,
    })
  }

  return data as BlogPost
})