import { serverSupabaseClient } from "#supabase/server";
import type { Database } from "~/types/database.types";

type Project = Database["public"]["Tables"]["projects"]["Row"];
type ProjectInsert = Database["public"]["Tables"]["projects"]["Insert"];

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient<Database>(event);
  const body = await readBody<ProjectInsert>(event);

  const { data, error } = await client
    .from("projects")
    .insert(body)
    .select()
    .single();

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    });
  }

  return data as Project;
});
