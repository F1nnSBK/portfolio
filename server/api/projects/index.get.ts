import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  // Das Modul stellt den Client automatisch bereit
  const client = await serverSupabaseClient(event)

  const { data, error } = await client
    .from('projects')
    .select('*')
    .not('disabled', 'is', true)
    .order('id', { ascending: true })

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    })
  }

  return data
})